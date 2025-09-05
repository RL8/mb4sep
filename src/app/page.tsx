export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
            MB
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Music Besties</h1>
          <p className="text-xl text-gray-600">The app for superfans to create, curate, and connect</p>
        </div>

        {/* Coming Soon Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-6xl mb-4">🎵</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We&apos;re crafting something amazing for Taylor Swift fans. Get ready to predict, rank, and connect with fellow Swifties!
          </p>
          
          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🔮</div>
              <h3 className="font-semibold text-purple-800">AI Predictions</h3>
              <p className="text-sm text-purple-600">Predict album rankings</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-pink-800">Personal Rankings</h3>
              <p className="text-sm text-pink-600">Rank your favorites</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">👥</div>
              <h3 className="font-semibold text-blue-800">Community</h3>
              <p className="text-sm text-blue-600">Connect with fans</p>
            </div>
          </div>

          {/* Countdown or Launch Info */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Target Launch:</strong> Q1 2025
            </p>
          </div>
        </div>

        {/* Admin Access (Development Only) */}
        <div className="text-center">
          <a 
            href="/admin" 
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
          >
            ⚙️ Admin Panel
          </a>
          <p className="text-xs text-gray-500 mt-2">Development access only</p>
        </div>
      </div>
    </div>
  )
}
