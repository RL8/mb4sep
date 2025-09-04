import { supabase } from '@/lib/supabase'

interface Song {
  id: string | number;
  title?: string;
  name?: string;
  song_title?: string;
  track_number?: number;
  trackNumber?: number;
  album_id?: string | number;
  duration?: number;
  length?: number;
  genre?: string;
  year?: number;
  artist?: string;
  lyrics?: string | boolean;
  explicit?: boolean;
  [key: string]: unknown;
}

export default async function HomePage() {
  // Fetch all albums
  const { data: albums, error: albumsError } = await supabase
    .from('albums')
    .select('*')
    .order('id', { ascending: true })

  // Fetch all songs
  const { data: songs, error: songsError } = await supabase
    .from('songs')
    .select('*')
    .order('track_number', { ascending: true })

  // Let's explore what other tables might exist by trying common table names
  const possibleTables = [
    'artists', 'genres', 'playlists', 'users', 'reviews', 'ratings', 
    'lyrics', 'instruments', 'producers', 'awards', 'concerts', 'tours',
    'venues', 'tickets', 'merchandise', 'photos', 'videos', 'interviews',
    'news', 'events', 'collaborations', 'features', 'remixes', 'covers'
  ]

  // Try to fetch from other potential tables
  const tableData: Record<string, unknown[]> = {}
  const tableErrors: Record<string, string> = {}

  for (const tableName of possibleTables) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(5) // Just get a few samples
      
      if (!error && data && data.length > 0) {
        tableData[tableName] = data
      } else if (error) {
        tableErrors[tableName] = error.message
      }
    } catch {
      // Table doesn't exist, that's fine
    }
  }

  if (albumsError) {
    return <div className="p-8 text-red-500">Error loading albums: {albumsError.message}</div>
  }

  if (songsError) {
    return <div className="p-8 text-red-500">Error loading songs: {songsError.message}</div>
  }

  // Group songs by album
  const songsByAlbum = songs?.reduce((acc, song) => {
    const albumId = song.album_id
    if (!acc[albumId]) {
      acc[albumId] = []
    }
    acc[albumId].push(song)
    return acc
  }, {} as Record<string, unknown[]>) || {}

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          MB4SEP - Taylor Swift Complete Discography
        </h1>
        
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <strong>✅ Successfully connected to Supabase!</strong>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{albums?.length || 0}</div>
            <div className="text-gray-600">Total Albums</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{songs?.length || 0}</div>
            <div className="text-gray-600">Total Songs</div>
          </div>
        </div>

        {/* Database Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">🗄️ Complete Database Overview</h2>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-blue-800">Core Tables</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{Object.keys(tableData).length}</div>
              <div className="text-sm text-green-800">Additional Tables</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{albums?.length || 0}</div>
              <div className="text-sm text-purple-800">Albums</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{songs?.length || 0}</div>
              <div className="text-sm text-orange-800">Songs</div>
            </div>
          </div>

          {/* Available Tables */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Available Tables in Your Database:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Core Tables */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Core Music Data</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>albums</span>
                      <span className="text-blue-600 font-mono">{albums?.length || 0} records</span>
                    </div>
                    <div className="flex justify-between">
                      <span>songs</span>
                      <span className="text-blue-600 font-mono">{songs?.length || 0} records</span>
                    </div>
                  </div>
                </div>

                {/* Additional Tables */}
                {Object.keys(tableData).map((tableName) => (
                  <div key={tableName} className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2 capitalize">{tableName}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Records</span>
                        <span className="text-green-600 font-mono">{tableData[tableName]?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Columns</span>
                        <span className="text-green-600 font-mono">
                          {tableData[tableName]?.[0] ? Object.keys(tableData[tableName][0]).length : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Data from Additional Tables */}
            {Object.keys(tableData).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🔍 Sample Data from Additional Tables:</h3>
                <div className="space-y-4">
                  {Object.entries(tableData).map(([tableName, data]) => (
                    <div key={tableName} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2 capitalize">{tableName} Table</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Columns: </span>
                          <span className="text-sm text-gray-600 font-mono">
                            {data?.[0] ? Object.keys(data[0]).join(', ') : 'No data'}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Sample Record: </span>
                          <pre className="bg-white p-2 rounded text-xs overflow-x-auto mt-1">
                            {JSON.stringify(data?.[0], null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Tables Schema */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🏗️ Core Tables Schema:</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Albums Table</h4>
                  <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                    {albums && albums.length > 0 ? JSON.stringify(Object.keys(albums[0]), null, 2) : 'No data'}
                  </pre>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Songs Table</h4>
                  <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                    {songs && songs.length > 0 ? JSON.stringify(Object.keys(songs[0]), null, 2) : 'No data'}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Albums and Songs Display */}
        <div className="space-y-8">
          {albums?.map((album) => {
            const albumSongs = songsByAlbum[album.id] || []
            return (
              <div key={album.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Album Header */}
                <div 
                  className="p-6 border-b"
                  style={{ borderLeft: `6px solid ${album.color || '#ccc'}` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {album.title || album.name || album.album_name || `Album ${album.id}`}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                        <span>{albumSongs.length} songs</span>
                        {album.year && <><span>•</span><span>Year: {album.year}</span></>}
                        {album.release_date && <><span>•</span><span>Released: {album.release_date}</span></>}
                        {album.genre && <><span>•</span><span>Genre: {album.genre}</span></>}
                        {album.artist && <><span>•</span><span>Artist: {album.artist}</span></>}
                        {album.color && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                              <span>Theme Color:</span>
                              <span 
                                className="w-5 h-5 rounded-full border-2 border-gray-300"
                                style={{ backgroundColor: album.color }}
                              ></span>
                            </div>
                          </>
                        )}
                      </div>
                      {album.description && (
                        <div className="mt-2 text-sm text-gray-700 italic">
                          {album.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Songs List */}
                {albumSongs.length > 0 && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Track Listing</h3>
                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                       {albumSongs.map((song: Song) => (
                         <div key={song.id} className="bg-gray-50 rounded-lg p-3 border-l-4 border-gray-200">
                           <div className="flex items-start gap-3">
                             <span className="text-sm font-mono text-gray-500 w-8 text-center mt-1">
                               {song.track_number || song.trackNumber || '?'}
                             </span>
                             <div className="flex-1">
                               <div className="font-medium text-gray-900 mb-1">
                                 {song.title || song.name || song.song_title || 'Untitled'}
                               </div>
                               <div className="text-xs text-gray-600 space-y-1">
                                 {song.duration && (
                                   <div>Duration: {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</div>
                                 )}
                                 {song.length && (
                                   <div>Length: {song.length}</div>
                                 )}
                                 {song.genre && (
                                   <div>Genre: {song.genre}</div>
                                 )}
                                 {song.year && (
                                   <div>Year: {song.year}</div>
                                 )}
                                 {song.artist && (
                                   <div>Artist: {song.artist}</div>
                                 )}
                                 {song.lyrics && (
                                   <div className="text-xs text-gray-500 italic">Has lyrics</div>
                                 )}
                                 {song.explicit !== undefined && (
                                   <div className={song.explicit ? 'text-red-600' : 'text-green-600'}>
                                     {song.explicit ? 'Explicit' : 'Clean'}
                                   </div>
                                 )}
                               </div>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Connection Status */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-6 inline-block">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Database Connection Status</h2>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Connected to Supabase
            </div>
            <p className="text-gray-600 mt-2 text-sm">
              URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
