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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
