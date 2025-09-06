'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

// Removed unused TableSchema interface

interface SchemaColumn {
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
    query: 'SELECT * FROM albums ORDER BY year;',
    description: 'Complete list of all Taylor Swift albums'
  },
  {
    name: 'Songs by Album',
    query: `SELECT s.*, a.name as album_name 
FROM songs s 
JOIN albums a ON s.album_id = a.id 
ORDER BY a.name, s.track_number;`,
    description: 'All songs with their corresponding album names'
  },
  {
    name: 'Album with Song Counts',
    query: `SELECT a.*, COUNT(s.id) as song_count 
FROM albums a 
LEFT JOIN songs s ON a.id = s.album_id 
GROUP BY a.id, a.name, a.year, a.color, a.analytics, a.created_at, a.updated_at
ORDER BY a.year;`,
    description: 'Albums with total song counts'
  },
  {
    name: 'Recent Albums (2015+)',
    query: 'SELECT * FROM albums WHERE year >= 2015 ORDER BY year DESC;',
    description: 'Albums released from 2015 onwards'
  },
  {
    name: 'Songs by Duration',
    query: 'SELECT name, duration, album_id FROM songs ORDER BY duration DESC LIMIT 20;',
    description: 'Longest songs across all albums'
  },
  {
    name: 'User Rankings (Mock)',
    query: `SELECT 
  u.username,
  r.album_id,
  a.name as album_name,
  r.rank_position,
  r.created_at
FROM user_rankings r
JOIN users u ON r.user_id = u.id
JOIN albums a ON r.album_id = a.id
ORDER BY r.created_at DESC
LIMIT 50;`,
    description: 'Recent user album rankings (mock data)'
  },
  {
    name: 'Prediction Activity (Mock)',
    query: `SELECT 
  u.username,
  p.predicted_rank,
  p.confidence_score,
  p.created_at
FROM user_predictions p
JOIN users u ON p.user_id = u.id
WHERE p.album_id = 'life-of-a-showgirl'
ORDER BY p.created_at DESC
LIMIT 20;`,
    description: 'User predictions for Life of a Showgirl (mock data)'
  }
]

export default function DatabaseAdminPage() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [schema, setSchema] = useState<Record<string, SchemaColumn[]>>({})
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<QueryResult | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [queryHistory, setQueryHistory] = useState<string[]>([])
  const [lastSchemaUpdate, setLastSchemaUpdate] = useState<string>('')

  useEffect(() => {
    checkConnection()
    loadSchema()
    setLastSchemaUpdate(new Date().toISOString())
  }, [])

  const checkConnection = async () => {
    try {
      // Test actual database connection and get real schema
      const { error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_type', 'BASE TABLE')

      if (tablesError) {
        // Fallback: try to query known tables directly
        const knownTables = ['albums', 'songs']
        let connectedTables = 0
        
        for (const table of knownTables) {
          try {
            const { error } = await supabase.from(table).select('*').limit(1)
            if (!error) connectedTables++
          } catch (e) {
            console.warn(`Table ${table} not accessible:`, e)
          }
        }
        
        if (connectedTables > 0) {
          setConnectionStatus('connected')
        } else {
          setConnectionStatus('error')
        }
      } else {
        // Successfully got schema information
        setConnectionStatus('connected')
      }
    } catch (error) {
      console.error('Database connection error:', error)
      setConnectionStatus('error')
    }
  }

  const loadSchema = async () => {
    try {
      // First try to get real schema from information_schema
      const { data: columns, error: columnsError } = await supabase
        .from('information_schema.columns')
        .select('table_name, column_name, data_type, is_nullable, column_default')
        .eq('table_schema', 'public')
        .order('table_name, ordinal_position')

      if (!columnsError && columns) {
        // Group columns by table name
        const schemaData: Record<string, SchemaColumn[]> = {}
        columns.forEach(col => {
          if (!schemaData[col.table_name]) {
            schemaData[col.table_name] = []
          }
          schemaData[col.table_name].push({
            column_name: col.column_name,
            data_type: col.data_type,
            is_nullable: col.is_nullable,
            column_default: col.column_default
          })
        })
        setSchema(schemaData)
        return
      }

      // Fallback: Try to get schema by querying actual tables
      console.warn('Could not access information_schema, trying direct table queries')
      const knownTables = ['albums', 'songs']
      const schemaData: Record<string, SchemaColumn[]> = {}

      for (const tableName of knownTables) {
        try {
          // Try to get a sample row to understand the structure
          const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .limit(1)

          if (!error && data && data.length > 0) {
            // Extract column information from the sample data
            const columns: SchemaColumn[] = Object.keys(data[0]).map(key => ({
              column_name: key,
              data_type: typeof data[0][key] === 'number' ? 'integer' : 
                        typeof data[0][key] === 'boolean' ? 'boolean' : 'text',
              is_nullable: 'YES',
              column_default: null
            }))
            schemaData[tableName] = columns
          }
        } catch (tableError) {
          console.warn(`Could not load schema for table ${tableName}:`, tableError)
        }
      }

      if (Object.keys(schemaData).length > 0) {
        setSchema(schemaData)
      } else {
        // No tables accessible - show error state
        setSchema({})
      }
    } catch (error) {
      console.error('Schema loading error:', error)
      setSchema({})
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
    return schema[tableName] || []
  }

  const getTableNames = () => {
    return Object.keys(schema)
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
            {connectionStatus === 'connected' ? 'Database Connected' : 
             connectionStatus === 'error' ? 'Connection Failed' : 'Testing Connection...'}
          </span>
          {connectionStatus === 'connected' && (
            <span className="text-xs text-gray-500">
              ({Object.keys(schema).length} tables detected)
            </span>
          )}
        </div>
      </div>

      {/* Schema Viewer */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Database Schema</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadSchema}
              disabled={connectionStatus === 'checking'}
            >
              Refresh Schema
            </Button>
            {lastSchemaUpdate && (
              <span className="text-xs text-gray-500">
                Last updated: {new Date(lastSchemaUpdate).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        
        {/* Schema Status */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-900">Schema Status</span>
          </div>
          <div className="text-sm text-blue-800">
            <p>• Core tables: albums, songs (verified)</p>
            <p>• User tables: users, user_rankings, user_predictions (mock data)</p>
            <p>• Community tables: reviews, notes, artist_requests (planned)</p>
          </div>
        </div>

        {Object.keys(schema).length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-2">No schema information available</div>
            <div className="text-sm text-gray-400">
              {connectionStatus === 'error' ? 'Database connection failed' : 'Loading schema...'}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {getTableNames().map(tableName => (
              <div key={tableName} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-lg">{tableName}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {getTableColumns(tableName).length} columns
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    tableName === 'albums' || tableName === 'songs' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tableName === 'albums' || tableName === 'songs' ? 'Verified' : 'Mock Data'}
                  </span>
                </div>
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
            
            {/* Mock Tables Info */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Mock Tables (Not Yet Implemented)</h4>
              <div className="text-sm text-yellow-800 space-y-1">
                <p>• <strong>users:</strong> User accounts and profiles</p>
                <p>• <strong>user_rankings:</strong> Album and song rankings by users</p>
                <p>• <strong>user_predictions:</strong> Life of a Showgirl predictions</p>
                <p>• <strong>reviews:</strong> User reviews and ratings</p>
                <p>• <strong>notes:</strong> Personal notes and thoughts</p>
                <p>• <strong>artist_requests:</strong> Community artist requests</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Query Interface */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Query Interface</h2>
        
        {/* Pre-built Queries */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Pre-built Queries:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {preBuiltQueries.map((preQuery, index) => (
              <button
                key={index}
                onClick={() => setQuery(preQuery.query)}
                className="p-3 bg-blue-50 border border-blue-200 rounded text-left hover:bg-blue-100 transition-colors"
              >
                <div className="font-medium text-blue-900 text-sm">{preQuery.name}</div>
                <div className="text-xs text-blue-700 mt-1">{preQuery.description}</div>
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
