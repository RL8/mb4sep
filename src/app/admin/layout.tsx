'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: '📊'
  },
  {
    id: 'specification',
    label: 'Specification',
    href: '/admin/specification',
    icon: '📋'
  },
  {
    id: 'mvp-docs',
    label: 'MVP Docs',
    href: '/admin/mvp-docs',
    icon: '🚀'
  },
  {
    id: 'pattern-analysis',
    label: 'Pattern Analysis',
    href: '/admin/pattern-analysis',
    icon: '🔍'
  },
  {
    id: 'database',
    label: 'Database Admin',
    href: '/admin/database',
    icon: '🗄️'
  },
  {
    id: 'gallery',
    label: 'Gallery',
    href: '/admin/gallery',
    icon: '🎨'
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar - Always Visible */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
              MB
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Music Besties</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu and Back Button */}
          <div className="flex items-center gap-2">
            {/* Mobile Navigation Dropdown */}
            <div className="md:hidden">
              <select 
                value={pathname} 
                onChange={(e) => window.location.href = e.target.value}
                className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
              >
                {navigationItems.map((item) => (
                  <option key={item.id} value={item.href}>
                    {item.icon} {item.label}
                  </option>
                ))}
              </select>
            </div>

            <Link href="/">
              <Button variant="outline" size="sm">
                ← Back to App
              </Button>
            </Link>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-6 py-2 bg-muted/50 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Development Environment</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Active
              </span>
            </div>
            <div>
              Current: {navigationItems.find(item => item.href === pathname)?.label || 'Admin'}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
