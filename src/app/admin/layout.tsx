'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminSecurity } from '@/components/AdminSecurity';

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
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/admin/analytics',
    icon: '📈'
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  useEffect(() => {
    // Reset loading state when pathname changes
    setIsLoading(false);
    setLoadingPath(null);
  }, [pathname]);

  const handleNavigation = (href: string) => {
    if (href !== pathname) {
      setIsLoading(true);
      setLoadingPath(href);
      router.push(href);
    }
  };

  return (
    <AdminSecurity>
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
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.href)}
                  disabled={isLoading}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="hidden lg:inline">{item.label}</span>
                  {isLoading && loadingPath === item.href && (
                    <Skeleton className="h-4 w-4 rounded-full" />
                  )}
                </button>
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
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Skeleton className="h-8 w-8 rounded" />
                      <div>
                        <Skeleton className="h-5 w-32 mb-1" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
    </AdminSecurity>
  );
}
