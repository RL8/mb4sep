'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MvpSpecTable() {
  const mvpSections = [
    {
      id: 1,
      type: 'page',
      title: 'Landing Page',
      icon: '📱',
      purpose: 'Simple entry point focused on Taylor Swift ranking',
      design: 'Mobile-first, single-page layout with clear value proposition',
      features: [
        'App Name: "Taylor Swift Rankings"',
        'Tagline: "Rank your favorite albums and songs"',
        'Single "Start Ranking" button',
        'Preview of ranking interface',
        'Social proof: "Join 1,000+ Swifties"'
      ],
      technicalPractices: {
        current: ['Next.js 15 App Router', 'TypeScript', 'shadcn/ui components', 'Responsive design'],
        improvements: ['Error boundaries with react-error-boundary', 'Lazy loading with dynamic imports', 'SEO optimization with Next.js metadata', 'Performance monitoring with web-vitals'],
        dependencies: ['react-error-boundary', 'web-vitals', 'next/dynamic'],
        testing: ['Component tests with @testing-library/react', 'E2E tests with Playwright', 'Accessibility tests with @axe-core/react'],
        sharedComponents: ['Button', 'Card', 'LoadingSpinner'],
        userJourney: ['Entry point for all user flows', 'Connects to ranking and prediction features']
      }
    },
    {
      id: 2,
      type: 'core',
      title: 'Ranking Interface',
      icon: '🎵',
      purpose: 'Core value proposition - ranking Taylor Swift\'s discography',
      design: 'Intuitive tap-to-rank mobile interface with visual feedback',
      features: [
        { text: 'Rank 3 albums + 13 songs total', tier: 'free' },
        { text: 'Rank entire discography', tier: 'premium' },
        'Tap-to-rank interface with numbered badges',
        'Cross-album song selection',
        'Drag-and-drop reordering',
        'Progress indicators and visual feedback'
      ],
      technicalPractices: {
        current: ['React state management', 'Touch-optimized interactions', 'Visual feedback animations'],
        improvements: ['Drag-and-drop with @dnd-kit/core', 'Optimistic updates with @tanstack/react-query', 'Keyboard navigation with focus-trap-react'],
        dependencies: ['@dnd-kit/core', '@tanstack/react-query', 'focus-trap-react'],
        testing: ['Drag-and-drop interaction tests', 'State management tests', 'Keyboard navigation tests', 'Touch interaction tests'],
        sharedComponents: ['DraggableItem', 'DropZone', 'ProgressBar', 'RankingCard'],
        userJourney: ['Core ranking experience', 'Connects to knowledge base and sharing']
      }
    },
    {
      id: 3,
      type: 'content',
      title: 'Knowledge Base',
      icon: '📚',
      purpose: 'Provide context and information to enhance ranking experience',
      design: 'Clean, searchable interface with album/song details',
      features: [
        { text: 'Access only to ranked items', tier: 'free' },
        { text: 'Full discography access', tier: 'premium' },
        'Album covers, release dates, track listings',
        'Song details, duration, track numbers',
        'Basic search and filtering',
        'Upgrade prompts for full access'
      ],
      technicalPractices: {
        current: ['Static data management', 'Basic search functionality'],
        improvements: ['Image optimization with Next.js Image', 'Caching with @tanstack/react-query', 'Data validation with zod', 'API layer with Next.js API routes'],
        dependencies: ['next/image', '@tanstack/react-query', 'zod'],
        testing: ['Image loading tests', 'Cache invalidation tests', 'API endpoint tests', 'Data validation tests'],
        sharedComponents: ['SearchInput', 'DataCard', 'ImageOptimized', 'LoadingState'],
        userJourney: ['Research tool for ranking decisions', 'Connects to ranking interface']
      }
    },
    {
      id: 4,
      type: 'personal',
      title: 'Reviews & Notes System',
      icon: '💬',
      purpose: 'Two content systems: Reviews (rate + opinions) and Notes (titled personal thoughts)',
      design: 'Separate forms for reviews (1-5 stars + text) and notes (title + content)',
      features: [
        { text: 'Reviews: Rate albums/songs 1-5 stars with optional text (1000 chars)', tier: 'free' },
        { text: 'Notes: Create titled entries with personal thoughts (title 100 chars, content 2000 chars)', tier: 'free' },
        { text: 'Reviews & Notes on any song/album', tier: 'premium' },
        'Privacy controls: Notes can be public or private',
        'Search functionality: Filter notes by title/content',
        'Real-time updates and auto-save',
        'Visual feedback with character counters',
        'Edit capabilities with timestamp and edit history'
      ],
      technicalPractices: {
        current: ['Form validation', 'Character counting', 'Basic CRUD operations'],
        improvements: ['Auto-save with react-hook-form + debouncing', 'Form validation with zod', 'Character counting with visual feedback'],
        dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
        testing: ['Form validation tests', 'Auto-save functionality tests', 'Character counting tests'],
        sharedComponents: ['FormField', 'TextArea', 'CharacterCounter', 'SaveButton'],
        userJourney: ['Personal content creation', 'Connects to sharing and community features']
      }
    },
    {
      id: 5,
      type: 'social',
      title: 'Shareable Links',
      icon: '🔗',
      purpose: 'Viral growth and social proof through shareable ranking pages',
      design: 'Clean, mobile-optimized sharing interface',
      features: [
        'Unique permanent link per user',
        'Public/private link settings',
        'Social media sharing buttons',
        'Mobile-optimized ranking display',
        'User notes and comments visible',
        'Basic analytics on link views'
      ],
      technicalPractices: {
        current: ['URL generation', 'Social media meta tags'],
        improvements: ['Open Graph with next-seo', 'Link expiration with database timestamps'],
        dependencies: ['next-seo'],
        testing: ['URL generation tests', 'Meta tag validation tests', 'Link expiration tests'],
        sharedComponents: ['ShareButton', 'LinkPreview', 'SocialIcons'],
        userJourney: ['Viral growth mechanism', 'Connects to all ranking and content features']
      }
    },
    {
      id: 6,
      type: 'monetization',
      title: 'Premium Upgrade',
      icon: '💰',
      purpose: 'Convert free users to premium subscribers',
      design: 'Clear upgrade prompts with compelling value proposition',
      features: [
        'Natural upgrade prompts at limits',
        'Feature comparison table',
        'Limited-time launch pricing',
        'One-click payment integration',
        'Immediate feature unlock',
        '30-day money-back guarantee'
      ],
      technicalPractices: {
        current: ['Basic payment integration'],
        improvements: ['Stripe integration with @stripe/stripe-js', 'Feature gating with middleware'],
        dependencies: ['@stripe/stripe-js'],
        testing: ['Payment flow tests', 'Feature gating tests'],
        sharedComponents: ['PaymentButton', 'FeatureGate', 'UpgradePrompt'],
        userJourney: ['Conversion point from free to premium', 'Unlocks advanced features']
      }
    },
    {
      id: 7,
      type: 'engagement',
      title: 'Prediction Game',
      icon: '🎮',
      purpose: 'Engage users with upcoming "Life of a Showgirl" album',
      design: 'Simple prediction interface with results tracking',
      features: [
        'Predict where LOAS will rank in your list',
        'Mark prediction as "sounds right" or "way off"',
        'Track accuracy after album release',
        'Available to all users (free and premium)',
        'Simple form-based interface',
        'Results comparison with other users'
      ],
      technicalPractices: {
        current: ['Form handling', 'Data persistence'],
        improvements: ['Simple prediction logic with heuristics', 'Basic gamification elements', 'Data persistence with @tanstack/react-query'],
        dependencies: ['@tanstack/react-query'],
        testing: ['Prediction logic tests', 'Gamification tests', 'Data persistence tests'],
        sharedComponents: ['PredictionForm', 'ConfidenceDisplay', 'GamificationBadge'],
        userJourney: ['Engagement hook for new users', 'Connects to ranking and sharing']
      }
    },
    {
      id: 8,
      type: 'community',
      title: 'Limited Social Features',
      icon: '👥',
      purpose: 'Basic community engagement for free users',
      design: 'Simple viewing interface for other users\' content',
      features: [
        { text: 'View limited public rankings', tier: 'free' },
        { text: 'Full community access', tier: 'premium' },
        'Browse other users\' public links',
        'Basic user profiles',
        'Simple search by username',
        'Upgrade prompts for full access'
      ],
      technicalPractices: {
        current: ['Basic user profiles', 'Public/private content'],
        improvements: ['Authentication with NextAuth.js', 'Profile management with React state', 'Privacy controls with basic permissions'],
        dependencies: ['next-auth'],
        testing: ['Authentication flow tests', 'Profile management tests', 'Privacy control tests'],
        sharedComponents: ['UserProfile', 'PrivacyToggle', 'PublicBadge'],
        userJourney: ['Social features foundation', 'Connects to sharing and community']
      }
    },
    {
      id: 9,
      type: 'data',
      title: 'User History',
      icon: '📊',
      purpose: 'Track user activity and provide ranking history',
      design: 'Simple timeline view of user actions',
      features: [
        { text: '7-day history retention', tier: 'free' },
        { text: 'Unlimited history', tier: 'premium' },
        'Timeline of ranking changes',
        'Note creation and edits',
        'Share link generation',
        'Export ranking data (premium)'
      ],
      technicalPractices: {
        current: ['Basic data storage'],
        improvements: ['Data export with simple CSV format', 'Activity tracking with basic metrics'],
        dependencies: ['csv-writer'],
        testing: ['Export functionality tests', 'Activity tracking tests'],
        sharedComponents: ['DataExport', 'ActivityTimeline', 'HistoryCard'],
        userJourney: ['User retention and engagement', 'Connects to all user activities']
      }
    },
    {
      id: 10,
      type: 'system',
      title: 'User Management',
      icon: '⚙️',
      purpose: 'Handle user accounts, subscriptions, and preferences',
      design: 'Simple account management with clear subscription status',
      features: [
        'Email/password authentication',
        'Subscription status tracking',
        'Payment history and billing',
        'Account settings and preferences',
        'Data export and deletion',
        'Customer support contact'
      ],
      technicalPractices: {
        current: ['Basic authentication'],
        improvements: ['OAuth with NextAuth.js providers', 'Session management with JWT', 'Password reset with secure tokens'],
        dependencies: ['next-auth', 'jsonwebtoken', 'nodemailer'],
        testing: ['OAuth flow tests', 'Session management tests', 'Password reset tests'],
        sharedComponents: ['LoginForm', 'AuthProvider', 'SessionManager'],
        userJourney: ['Foundation for all user features', 'Enables personalization and data persistence']
      }
    }
  ];

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'page': return 'bg-blue-100 text-blue-800';
      case 'core': return 'bg-green-100 text-green-800';
      case 'content': return 'bg-purple-100 text-purple-800';
      case 'personal': return 'bg-pink-100 text-pink-800';
      case 'social': return 'bg-cyan-100 text-cyan-800';
      case 'monetization': return 'bg-yellow-100 text-yellow-800';
      case 'engagement': return 'bg-orange-100 text-orange-800';
      case 'community': return 'bg-indigo-100 text-indigo-800';
      case 'data': return 'bg-gray-100 text-gray-800';
      case 'system': return 'bg-slate-100 text-slate-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierBadge = (tier: string) => {
    if (tier === 'free') {
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Free</Badge>;
    } else if (tier === 'premium') {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Premium</Badge>;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">4</div>
          <div className="text-sm text-muted-foreground">Core MVP Features</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">2</div>
          <div className="text-sm text-muted-foreground">User Tiers</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">3</div>
          <div className="text-sm text-muted-foreground">Albums (Free)</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">13</div>
          <div className="text-sm text-muted-foreground">Songs (Free)</div>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-semibold text-sm uppercase tracking-wide">Section</th>
                <th className="text-left p-4 font-semibold text-sm uppercase tracking-wide">Purpose & Design</th>
                <th className="text-left p-4 font-semibold text-sm uppercase tracking-wide">Content/Functionality</th>
                <th className="text-left p-4 font-semibold text-sm uppercase tracking-wide">Technical Implementation</th>
                <th className="text-left p-4 font-semibold text-sm uppercase tracking-wide">Pattern Analysis</th>
              </tr>
            </thead>
            <tbody>
              {mvpSections.map((section) => (
                <tr key={section.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeBadgeColor(section.type)}>
                        {section.icon} {section.type}
                      </Badge>
                      <span className="font-semibold">{section.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Purpose:</strong> {section.purpose}<br />
                      <strong className="text-foreground">Design:</strong> {section.design}
                    </div>
                  </td>
                  <td className="p-4">
                    <ul className="space-y-1">
                      {section.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-primary font-bold mt-0.5">•</span>
                          <div className="flex items-center gap-2">
                            {typeof feature === 'object' ? (
                              <>
                                {getTierBadge(feature.tier)}
                                <span>{feature.text}</span>
                              </>
                            ) : (
                              <span>{feature}</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4">
                    <div className="space-y-3">
                      {/* Current Practices */}
                      <div>
                        <h4 className="text-sm font-semibold text-green-700 mb-2">✅ Current Practices</h4>
                        <ul className="space-y-1">
                          {section.technicalPractices.current.map((practice, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs">
                              <span className="text-green-500 font-bold mt-0.5">•</span>
                              <span className="text-muted-foreground">{practice}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Improvements */}
                      <div>
                        <h4 className="text-sm font-semibold text-orange-700 mb-2">🚀 Technical Improvements</h4>
                        <ul className="space-y-1">
                          {section.technicalPractices.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs">
                              <span className="text-orange-500 font-bold mt-0.5">•</span>
                              <span className="text-muted-foreground">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Dependencies */}
                      <div>
                        <h4 className="text-sm font-semibold text-purple-700 mb-2">📦 Dependencies</h4>
                        <div className="flex flex-wrap gap-1">
                          {section.technicalPractices.dependencies.map((dep, index) => (
                            <span key={index} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                              {dep}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Testing */}
                      <div>
                        <h4 className="text-sm font-semibold text-red-700 mb-2">🧪 Testing Requirements</h4>
                        <ul className="space-y-1">
                          {section.technicalPractices.testing.map((test, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs">
                              <span className="text-red-500 font-bold mt-0.5">•</span>
                              <span className="text-muted-foreground">{test}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-3">
                      {/* Shared Components */}
                      <div>
                        <h4 className="text-sm font-semibold text-blue-700 mb-2">🧩 Shared Components</h4>
                        <div className="flex flex-wrap gap-1">
                          {section.technicalPractices.sharedComponents.map((component, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {component}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* User Journey */}
                      <div>
                        <h4 className="text-sm font-semibold text-green-700 mb-2">🛤️ User Journey</h4>
                        <ul className="space-y-1">
                          {section.technicalPractices.userJourney.map((journey, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs">
                              <span className="text-green-500 font-bold mt-0.5">•</span>
                              <span className="text-muted-foreground">{journey}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* MVP Pricing Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">MVP Pricing Strategy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Free Tier</h3>
            <div className="text-3xl font-bold text-primary mb-2">$0</div>
            <ul className="text-sm space-y-1">
              <li>• Rank 3 albums + 13 songs</li>
              <li>• Limited knowledge base</li>
              <li>• Notes on ranked items only</li>
              <li>• 7-day history</li>
              <li>• Prediction game</li>
              <li>• Shareable links</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4 bg-primary/5">
            <h3 className="font-semibold text-lg mb-2">Premium Monthly</h3>
            <div className="text-3xl font-bold text-primary mb-2">$4.89</div>
            <ul className="text-sm space-y-1">
              <li>• Rank entire discography</li>
              <li>• Full knowledge base access</li>
              <li>• Notes on any song/album</li>
              <li>• Unlimited history</li>
              <li>• All mini-games</li>
              <li>• Full community access</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4 bg-yellow-50">
            <h3 className="font-semibold text-lg mb-2">Launch Special</h3>
            <div className="text-3xl font-bold text-primary mb-2">$10.03</div>
            <div className="text-sm text-muted-foreground mb-2">per year (79% off)</div>
            <ul className="text-sm space-y-1">
              <li>• All premium features</li>
              <li>• Limited to first 1,989 users</li>
              <li>• Lifetime access</li>
              <li>• Early access to new features</li>
              <li>• Special community badge</li>
              <li>• Priority customer support</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* MVP Success Metrics */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">MVP Success Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">User Metrics</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>User Acquisition:</strong> 1,000+ users in first month</li>
              <li><strong>Engagement:</strong> 70%+ complete initial ranking</li>
              <li><strong>Retention:</strong> 40%+ 7-day retention</li>
              <li><strong>Sharing:</strong> 20%+ generate shareable links</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Revenue Metrics</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Conversion Rate:</strong> 5%+ free to premium</li>
              <li><strong>Monthly Revenue:</strong> $1,000+ by month 3</li>
              <li><strong>Customer Lifetime Value:</strong> $25+ average</li>
              <li><strong>Churn Rate:</strong> &lt;5% monthly churn</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
