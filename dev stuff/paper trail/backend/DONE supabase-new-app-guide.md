# Creating a New Next.js App Linked to Your Existing Supabase Instance

## **Step-by-Step Guide for Option 1: Separate App Approach**

### **1. Create the New App**
```bash
# Navigate to a different directory (e.g., parent directory)
cd ..
npx create-next-app@latest my-new-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-new-app
```

### **2. Install Required Dependencies**
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### **3. Set Up Environment Variables**
Create a `.env.local` file in your new app root:

```env
# Supabase Configuration (Same as your current app)
NEXT_PUBLIC_SUPABASE_URL=https://gyiiblmvmdhvtbvsqcbl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_g_MqYEvDb6AE6mvkbNql4A_TtL21DS9
SUPABASE_SERVICE_ROLE_KEY=sb_secret_-KCOU2naDD50YlvzsxD8cA_315u3Utj

# App-specific settings
NEXT_PUBLIC_APP_URL="http://localhost:3001"
```

### **4. Create Supabase Client Configuration**
Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Browser client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client (for API routes, server components)
export const createServerSupabaseClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
```

### **5. Update Package.json Scripts**
Modify your new app's `package.json` to use a different port:

```json
{
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001"
  }
}
```

### **6. Create a Basic Test Page**
Create `src/app/page.tsx` to verify Supabase connection:

```typescript
import { supabase } from '@/lib/supabase'

export default async function HomePage() {
  // Test the connection
  const { data, error } = await supabase.from('your_table_name').select('*').limit(1)
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">New App Connected to Supabase</h1>
      {error ? (
        <div className="text-red-500">Connection Error: {error.message}</div>
      ) : (
        <div className="text-green-500">✅ Successfully connected to Supabase!</div>
      )}
      <div className="mt-4">
        <p>Database URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
        <p>Data: {JSON.stringify(data, null, 2)}</p>
      </div>
    </div>
  )
}
```

### **7. Run Both Apps**
```bash
# Terminal 1 - Current app (chadnext)
cd chadnext
npm run dev  # Runs on port 3000

# Terminal 2 - New app
cd my-new-app
npm run dev  # Runs on port 3001
```

## **What This Gives You:**

✅ **Shared Database:** Both apps access the same Supabase tables and data  
✅ **Independent Development:** Each app can be developed separately  
✅ **Separate Deployments:** Deploy each app independently  
✅ **User Authentication:** Users can log into either app with the same credentials  
✅ **RLS Policies:** Your existing Row Level Security policies work across both apps  

## **File Structure After Setup:**
```
your-workspace/
├── chadnext/                 # Your current app (port 3000)
│   ├── .env
│   ├── src/
│   └── package.json
└── my-new-app/              # New app (port 3001)
    ├── .env.local
    ├── src/
    │   ├── lib/
    │   │   └── supabase.ts
    │   └── app/
    │       └── page.tsx
    └── package.json
```

---

# **Basic Homepage to Display Supabase Content**

## **Step 1: Create the New App Structure**

First, let's create the new app in a different directory:

```bash
# Navigate to parent directory
cd ..
npx create-next-app@latest supabase-frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd supabase-frontend
```

## **Step 2: Install Dependencies**

```bash
npm install @supabase/supabase-js
```

## **Step 3: Set Up Environment Variables**

Create `.env.local` in your new app:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gyiiblmvmdhvtbvsqcbl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_g_MqYEvDb6AE6mvkbNql4A_TtL21DS9
```

## **Step 4: Create Supabase Client**

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## **Step 5: Create the Basic Homepage**

Replace `src/app/page.tsx` with this simple Supabase content display:

```typescript
import { supabase } from '@/lib/supabase'

export default async function HomePage() {
  // Fetch albums from Supabase
  const { data: albums, error: albumsError } = await supabase
    .from('albums')
    .select('*')
    .order('release_year', { ascending: true })

  // Fetch songs count for each album
  const { data: songsCount, error: songsError } = await supabase
    .from('songs')
    .select('album_id')
    .order('album_id')

  if (albumsError) {
    return <div className="p-8 text-red-500">Error loading albums: {albumsError.message}</div>
  }

  if (songsError) {
    return <div className="p-8 text-red-500">Error loading songs: {songsError.message}</div>
  }

  // Count songs per album
  const albumSongCounts = songsCount?.reduce((acc, song) => {
    acc[song.album_id] = (acc[song.album_id] || 0) + 1
    return acc
  }, {} as Record<string, number>) || {}

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Taylor Swift Discography
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums?.map((album) => (
            <div 
              key={album.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              style={{ borderLeft: `4px solid ${album.color}` }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {album.name}
              </h2>
              <div className="text-gray-600 space-y-1">
                <p><strong>Year:</strong> {album.release_year}</p>
                <p><strong>Songs:</strong> {albumSongCounts[album.id] || 0}</p>
                <p><strong>Color:</strong> 
                  <span 
                    className="inline-block w-4 h-4 rounded ml-2"
                    style={{ backgroundColor: album.color }}
                  ></span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Database Connection Status
          </h2>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Connected to Supabase
          </div>
          <p className="text-gray-600 mt-2">
            URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
          </p>
        </div>
      </div>
    </div>
  )
}
```

## **Step 6: Update Package.json for Different Port**

Modify your new app's `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001"
  }
}
```

## **Step 7: Run Both Apps**

```bash
# Terminal 1 - Your current app (chadnext)
cd chadnext
npm run dev  # Port 3000

# Terminal 2 - New Supabase frontend
cd supabase-frontend
npm run dev  # Port 3001
```

## **What This Gives You:**

✅ **Simple Display:** Basic homepage showing all albums from your Supabase database  
✅ **Real-time Data:** Fetches data directly from your existing Supabase instance  
✅ **Clean UI:** Simple, responsive grid layout with album information  
✅ **Connection Status:** Shows that it's successfully connected to Supabase  
✅ **No Fancy Features:** Just a straightforward frontend to display your data  

## **Expected Output:**
- A clean homepage showing all 11 Taylor Swift albums
- Each album card displays: name, release year, song count, and color
- Connection status showing successful Supabase integration
- Responsive design that works on mobile and desktop

This gives you exactly what you asked for - a basic frontend to your Supabase content, nothing fancy, just displaying the data in a clean, readable format.
