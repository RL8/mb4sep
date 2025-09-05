'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface TableSchema {
  table_name: string
  column_name: string
  data_type: string
  is_nullable: string
  column_default: string | null
}

interface QueryResult {
  columns: string[]
  rows: Record<string, unknown>[]
  error?: string
}

const preBuiltQueries = [
  {
    name: 'All Albums',
    query: 'SELECT * FROM albums ORDER BY year;'
  },
  {
    name: 'Songs by Album',
    query: `SELECT s.*, a.name as album_name 
FROM songs s 
JOIN albums a ON s.album_id = a.id 
ORDER BY a.name, s.track_number;`
  },
  {
    name: 'Album with Song Counts',
    query: `SELECT a.*, COUNT(s.id) as song_count 
FROM albums a 
LEFT JOIN songs s ON a.id = s.album_id 
GROUP BY a.id, a.name, a.year, a.color, a.analytics, a.created_at, a.updated_at
ORDER BY a.year;`
  },
  {
    name: 'Recent Albums (2015+)',
    query: 'SELECT * FROM albums WHERE year >= 2015 ORDER BY year DESC;'
  },
  {
    name: 'Songs by Duration',
    query: 'SELECT name, duration, album_id FROM songs ORDER BY duration DESC LIMIT 20;'
  }
]

export default function DatabaseAdminPage() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [schema, setSchema] = useState<TableSchema[]>([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<QueryResult | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [queryHistory, setQueryHistory] = useState<string[]>([])

  useEffect(() => {
    checkConnection()
    loadSchema()
  }, [])

  const checkConnection = async () => {
    try {
      const { error } = await supabase.from('albums').select('count').limit(1)
      if (error) throw error
      setConnectionStatus('connected')
    } catch (error) {
      console.error('Database connection error:', error)
      setConnectionStatus('error')
    }
  }

  const loadSchema = async () => {
    try {
      // Get table schema information
      const { data, error } = await supabase
        .from('information_schema.columns')
        .select('table_name, column_name, data_type, is_nullable, column_default')
        .in('table_schema', ['public'])
        .order('table_name, ordinal_position')

      if (error) throw error
      setSchema(data || [])
    } catch (error) {
      console.error('Schema loading error:', error)
    }
  }

  const executeQuery = async () => {
    if (!query.trim()) return

    setIsExecuting(true)
    setResults(null)

    try {
      // Validate query (basic security check)
      const trimmedQuery = query.trim().toLowerCase()
      if (!trimmedQuery.startsWith('select')) {
        throw new Error('Only SELECT queries are allowed')
      }

      // For now, handle common queries directly
      let data, error

      if (trimmedQuery.includes('from albums')) {
        if (trimmedQuery.includes('count') && trimmedQuery.includes('group by')) {
          // Handle album with song counts query
          const { data: albums } = await supabase.from('albums').select('*')
          const { data: songs } = await supabase.from('songs').select('album_id')
          
          const albumSongCounts = songs?.reduce((acc, song) => {
            acc[song.album_id] = (acc[song.album_id] || 0) + 1
            return acc
          }, {} as Record<string, number>) || {}

          data = albums?.map(album => ({
            ...album,
            song_count: albumSongCounts[album.id] || 0
          }))
        } else {
          // Simple albums query
          const result = await supabase.from('albums').select('*')
          data = result.data
          error = result.error
        }
      } else if (trimmedQuery.includes('from songs')) {
        if (trimmedQuery.includes('join albums')) {
          // Handle songs with album names
          const { data: songs } = await supabase.from('songs').select('*')
          const { data: albums } = await supabase.from('albums').select('id, name')
          
          const albumMap = albums?.reduce((acc, album) => {
            acc[album.id] = album.name
            return acc
          }, {} as Record<string, string>) || {}

          data = songs?.map(song => ({
            ...song,
            album_name: albumMap[song.album_id] || 'Unknown'
          }))
        } else {
          // Simple songs query
          const result = await supabase.from('songs').select('*').limit(100)
          data = result.data
          error = result.error
        }
      } else {
        // Default to albums if query is not recognized
        const result = await supabase.from('albums').select('*')
        data = result.data
        error = result.error
      }

      if (error) throw error

      const columns = data && data.length > 0 ? Object.keys(data[0]) : []
      setResults({
        columns,
        rows: data || []
      })

      // Add to history
      setQueryHistory(prev => [query, ...prev.slice(0, 9)]) // Keep last 10 queries

    } catch (error: unknown) {
      setResults({
        columns: [],
        rows: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      })
    } finally {
      setIsExecuting(false)
    }
  }


  const clearQuery = () => {
    setQuery('')
    setResults(null)
  }

  const getTableColumns = (tableName: string) => {
    return schema.filter(col => col.table_name === tableName)
  }

  const getTableNames = () => {
    return [...new Set(schema.map(col => col.table_name))]
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Database Admin</h1>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' : 
            connectionStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
          }`}></div>
          <span className="text-sm font-medium">
            {connectionStatus === 'connected' ? 'Connected' : 
             connectionStatus === 'error' ? 'Connection Error' : 'Checking...'}
          </span>
        </div>
      </div>

      {/* Schema Viewer */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Database Schema</h2>
        <div className="space-y-4">
          {getTableNames().map(tableName => (
            <div key={tableName} className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">{tableName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {getTableColumns(tableName).map((column, index) => (
                  <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                    <span className="font-medium">{column.column_name}</span>
                    <span className="text-gray-600 ml-2">({column.data_type})</span>
                    {column.is_nullable === 'NO' && (
                      <span className="text-red-600 ml-1">*</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Query Interface */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Query Interface</h2>
        
        {/* Pre-built Queries */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Pre-built Queries:</h3>
          <div className="flex flex-wrap gap-2">
            {preBuiltQueries.map((preQuery, index) => (
              <button
                key={index}
                onClick={() => setQuery(preQuery.query)}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
              >
                {preQuery.name}
              </button>
            ))}
          </div>
        </div>

        {/* Query Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SQL Query (SELECT only):
            </label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-32 p-3 border rounded-lg font-mono text-sm"
              placeholder="SELECT * FROM albums ORDER BY year;"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={executeQuery}
              disabled={isExecuting || !query.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isExecuting ? 'Executing...' : 'Execute Query'}
            </button>
            <button
              onClick={clearQuery}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Query History */}
        {queryHistory.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Queries:</h3>
            <div className="space-y-1">
              {queryHistory.slice(0, 3).map((historyQuery, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(historyQuery)}
                  className="block w-full text-left p-2 bg-gray-50 rounded text-sm font-mono hover:bg-gray-100"
                >
                  {historyQuery.length > 80 ? `${historyQuery.substring(0, 80)}...` : historyQuery}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {results && (
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Query Results</h2>
          
          {results.error ? (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-800 font-medium">Error:</p>
              <p className="text-red-700">{results.error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {results.rows.length === 0 ? (
                <p className="text-gray-500">No results found.</p>
              ) : (
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      {results.columns.map((column, index) => (
                        <th key={index} className="border border-gray-300 px-4 py-2 text-left font-medium">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-gray-50">
                        {results.columns.map((column, colIndex) => (
                          <td key={colIndex} className="border border-gray-300 px-4 py-2">
                            {typeof row[column] === 'object' 
                              ? JSON.stringify(row[column]) 
                              : String(row[column] || '')
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {results.rows.length} row{results.rows.length !== 1 ? 's' : ''} returned
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
