import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock data for section summaries - in a real app, this would come from a database or API
const sectionSummaries = [
  {
    id: 'specification',
    title: 'App Specification',
    description: 'Complete workflow documentation with MVP scoping',
    icon: '📋',
    href: '/admin/specification',
    lastEdited: '2024-12-19T10:30:00Z',
    status: 'active',
    stats: {
      totalFeatures: 45,
      mvpFeatures: 12,
      testCoverage: 78
    },
    recentActivity: 'Updated MVP toggle functionality and added expand/collapse for table rows'
  },
  {
    id: 'pattern-analysis',
    title: 'Pattern Analysis',
    description: 'Cross-feature analysis of component reuse and consistency',
    icon: '🔍',
    href: '/admin/pattern-analysis',
    lastEdited: '2024-12-19T09:15:00Z',
    status: 'active',
    stats: {
      patterns: 8,
      sharedComponents: 24,
      consistency: 'High'
    },
    recentActivity: 'Removed MVP references and focused on overall specification patterns'
  },
  {
    id: 'database',
    title: 'Database Admin',
    description: 'Database schema management and query interface',
    icon: '🗄️',
    href: '/admin/database',
    lastEdited: '2024-12-18T16:45:00Z',
    status: 'needs-update',
    stats: {
      tables: 2,
      connections: 'Active',
      queries: 5
    },
    recentActivity: 'Schema needs updating with latest features and relationships'
  },
  {
    id: 'gallery',
    title: 'Component Gallery',
    description: 'Visual showcase of shadcn/ui components',
    icon: '🎨',
    href: '/admin/gallery',
    lastEdited: '2024-12-17T14:20:00Z',
    status: 'active',
    stats: {
      components: 8,
      examples: 12,
      lastUpdate: 'Auto'
    },
    recentActivity: 'Gallery auto-updates when components/ui directory changes'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'needs-update':
      return 'bg-yellow-100 text-yellow-800';
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

const formatLastEdited = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString();
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Development tools and project overview for Music Besties
        </p>
      </div>

      {/* Section Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectionSummaries.map((section) => (
          <Card key={section.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {section.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(section.status)}>
                  {section.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(section.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-lg font-semibold text-primary">{value}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Recent Activity */}
              <div className="pt-2 border-t">
                <div className="text-xs text-muted-foreground mb-1">Recent Activity:</div>
                <div className="text-sm text-foreground">{section.recentActivity}</div>
              </div>
              
              {/* Last Edited & Action */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-muted-foreground">
                  Last edited: {formatLastEdited(section.lastEdited)}
                </div>
                <Link href={section.href}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground">Development Phase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Admin Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{sectionSummaries.length}</div>
            <p className="text-xs text-muted-foreground">Available Tools</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Framework</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">Next.js</div>
            <p className="text-xs text-muted-foreground">React Framework</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Design System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">shadcn/ui</div>
            <p className="text-xs text-muted-foreground">Component Library</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common development tasks and navigation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/specification">
              <Button variant="outline" className="w-full justify-start">
                📋 View App Specification
              </Button>
            </Link>
            <Link href="/admin/pattern-analysis">
              <Button variant="outline" className="w-full justify-start">
                🔍 Pattern Analysis
              </Button>
            </Link>
            <Link href="/admin/database">
              <Button variant="outline" className="w-full justify-start">
                🗄️ Database Admin
              </Button>
            </Link>
            <Link href="/admin/gallery">
              <Button variant="outline" className="w-full justify-start">
                🎨 Browse Component Gallery
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full justify-start">
                🏠 View Coming Soon Page
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Development Status</CardTitle>
            <CardDescription>
              Current project state and next steps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Admin Dashboard</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  ✅ Complete
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">MVP Toggle System</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  ✅ Complete
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Table Row Optimization</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  ✅ Complete
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Schema Update</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  🚧 In Progress
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">User Profile Sharing</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  🚧 Planned
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>
            Music Besties - Taylor Swift fan app for predictions, rankings, and community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Core Features (Planned)</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• AI-powered album prediction game</li>
                <li>• Personal ranking system for albums & songs</li>
                <li>• Community features and user matching</li>
                <li>• Freemium monetization model</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Technical Stack</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Next.js 14 with App Router</li>
                <li>• TypeScript for type safety</li>
                <li>• shadcn/ui component library</li>
                <li>• Supabase for backend services</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
