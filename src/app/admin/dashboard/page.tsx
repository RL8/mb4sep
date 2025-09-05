import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

      {/* Quick Stats */}
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Admin Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">4</div>
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
            <Link href="/admin/mvp-docs">
              <Button variant="outline" className="w-full justify-start">
                🚀 Review MVP Documentation
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
                <span className="text-sm font-medium">Coming Soon Page</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  ✅ Complete
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Main App Features</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  🚧 Planned
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">User Interface</span>
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
