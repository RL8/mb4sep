# MB4SEP - Taylor Swift Fan App

A Next.js application that provides an engaging fan experience with AI-powered predictions and comprehensive ranking capabilities for Taylor Swift's discography.

## 🎯 Overview

This application provides a unique fan experience featuring:

- **AI-Powered Prediction Game** - Predict where "Life of a Showgirl" will rank in your personal top 10
- **Complete Discography Ranking** - Rank albums and songs with intuitive interface
- **Personalized Narratives** - AI-generated explanations for your predictions
- **Community Features** - Share rankings and compare with other fans
- **Mobile-First Design** - Optimized for mobile fan engagement

## 🚀 Features

### 1. Prediction Game (Primary Feature)
- **AI-Powered Analysis** - Analyzes your taste to predict Life of a Showgirl ranking
- **Confidence Scoring** - Shows prediction accuracy and reasoning
- **Personalized Narratives** - AI-generated explanations for predictions
- **Quick Taste Profile** - Build taste profile with 3-album ranking for new users
- **Prediction Storage** - Save predictions for verification when album releases

### 2. Ranking System
- **Album Ranking** - Rank Taylor Swift's complete discography
- **Song Ranking** - Cross-album song selection and ranking
- **Visual Feedback** - Numbered badges and smooth animations
- **Prediction Integration** - Rankings improve prediction accuracy
- **Shareable Results** - Generate and share your rankings

### 3. Community Features
- **Shareable Links** - Unique permanent links for your rankings
- **Prediction Sharing** - Share your Life of a Showgirl predictions
- **Community Comparison** - Compare rankings with other fans
- **Social Proof** - See how your predictions compare to others

## 🛠️ Technical Implementation

### Built With
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Backend database and API
- **ESLint** - Code quality and consistency

### Database Connection
- **Environment Variables** - Secure configuration
- **Client-side and Server-side** - Both browser and server Supabase clients
- **Error Handling** - Graceful error display and recovery
- **Real-time Updates** - Live data from your database

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account and database

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3001](http://localhost:3001) in your browser

## 📊 Database Schema

The application automatically discovers and displays data from these potential tables:
- **Core Tables**: `albums`, `songs`
- **Additional Tables**: `artists`, `genres`, `playlists`, `users`, `reviews`, `ratings`, `lyrics`, `instruments`, `producers`, `awards`, `concerts`, `tours`, `venues`, `tickets`, `merchandise`, `photos`, `videos`, `interviews`, `news`, `events`, `collaborations`, `features`, `remixes`, `covers`

## 🎨 Features

### Database Explorer
- **Automatic Table Discovery** - Finds all available tables
- **Schema Analysis** - Shows column names and data types
- **Sample Data Display** - Shows actual records from each table
- **Record Counts** - Displays number of records in each table

### Responsive Design
- **Mobile-first** - Optimized for mobile devices
- **Tablet Support** - Responsive grid layouts
- **Desktop Enhanced** - Full-featured desktop experience
- **Touch-friendly** - Optimized for touch interactions

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for server-side operations
- `NEXT_PUBLIC_APP_URL` - Application URL (default: http://localhost:3001)

### Port Configuration
The app runs on port 3001 by default to avoid conflicts with other Next.js apps.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Usage

### Viewing Data
1. **Database Overview** - See summary statistics and available tables
2. **Album Exploration** - Browse all albums with their songs
3. **Song Details** - View complete track listings with metadata
4. **Schema Information** - Understand your database structure

### Navigation
- **Scroll through albums** - Each album shows its complete song list
- **View metadata** - All available fields are displayed
- **Check connection status** - Verify Supabase connectivity

## 🔍 Troubleshooting

### Common Issues
1. **Connection Errors** - Check your Supabase URL and keys
2. **Missing Data** - Verify your database has the expected tables
3. **Port Conflicts** - Ensure port 3001 is available
4. **Build Errors** - Check that all dependencies are installed

### Debug Information
The app includes comprehensive debug information showing:
- Available table names
- Column schemas
- Sample data records
- Connection status

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional data visualization features
- Enhanced filtering and search
- User authentication integration
- Performance optimizations
- Mobile app development

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For issues or questions:
1. Check the browser console for errors
2. Verify your Supabase configuration
3. Ensure all environment variables are set
4. Check the debug information on the app

---

**MB4SEP** - Your comprehensive Supabase database explorer for Taylor Swift's discography and beyond!