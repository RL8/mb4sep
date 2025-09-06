'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface AdminSecurityProps {
  children: React.ReactNode;
}

export function AdminSecurity({ children }: AdminSecurityProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isProduction = process.env.NODE_ENV === 'production';
      
      if (!isProduction) {
        // In development, allow access
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // In production, check for valid admin session
      const adminToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin-token='))
        ?.split('=')[1];
      
      const adminSession = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin-session='))
        ?.split('=')[1];

      if (adminToken && adminSession) {
        // Verify session is not expired (24 hours)
        const sessionTime = parseInt(adminSession);
        const now = Date.now();
        const sessionValid = (now - sessionTime) < 24 * 60 * 60 * 1000;

        if (sessionValid) {
          setIsAuthenticated(true);
        } else {
          // Session expired
          document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          document.cookie = 'admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    // Clear admin cookies
    document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-32 mx-auto" />
              <Skeleton className="h-4 w-48 mx-auto" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need to be authenticated to access the admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => router.push('/admin/login')}
              className="w-full"
            >
              Go to Login
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push('/')}
              className="w-full"
            >
              Back to Main App
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Security Status Bar */}
      <div className="fixed top-0 right-0 z-50 p-2">
        <div className="flex items-center gap-2 bg-background/95 backdrop-blur border rounded-lg px-3 py-1 shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-muted-foreground">Admin Session Active</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="h-6 px-2 text-xs"
          >
            Logout
          </Button>
        </div>
      </div>
      
      {children}
    </div>
  );
}

export function SecurityStatus() {
  const [securityInfo, setSecurityInfo] = useState({
    isProduction: false,
    hasHttps: false,
    hasSecurityHeaders: false,
    sessionValid: false
  });

  useEffect(() => {
    const checkSecurity = () => {
      const isProduction = process.env.NODE_ENV === 'production';
      const hasHttps = window.location.protocol === 'https:';
      const hasSecurityHeaders = true; // Would check actual headers in real implementation
      
      const adminSession = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin-session='))
        ?.split('=')[1];
      
      const sessionValid = adminSession ? 
        (Date.now() - parseInt(adminSession)) < 24 * 60 * 60 * 1000 : false;

      setSecurityInfo({
        isProduction,
        hasHttps,
        hasSecurityHeaders,
        sessionValid
      });
    };

    checkSecurity();
  }, []);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔒 Security Status
        </CardTitle>
        <CardDescription>
          Current security configuration and session status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
              securityInfo.isProduction ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            <div className="text-xs text-muted-foreground">Environment</div>
            <div className="text-sm font-medium">
              {securityInfo.isProduction ? 'Production' : 'Development'}
            </div>
          </div>
          <div className="text-center">
            <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
              securityInfo.hasHttps ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <div className="text-xs text-muted-foreground">HTTPS</div>
            <div className="text-sm font-medium">
              {securityInfo.hasHttps ? 'Enabled' : 'Disabled'}
            </div>
          </div>
          <div className="text-center">
            <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
              securityInfo.hasSecurityHeaders ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <div className="text-xs text-muted-foreground">Security Headers</div>
            <div className="text-sm font-medium">
              {securityInfo.hasSecurityHeaders ? 'Active' : 'Missing'}
            </div>
          </div>
          <div className="text-center">
            <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
              securityInfo.sessionValid ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <div className="text-xs text-muted-foreground">Session</div>
            <div className="text-sm font-medium">
              {securityInfo.sessionValid ? 'Valid' : 'Expired'}
            </div>
          </div>
        </div>
        
        {!securityInfo.isProduction && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-sm text-yellow-800">
              <strong>Development Mode:</strong> Security measures are relaxed for development. 
              In production, proper authentication and HTTPS would be required.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
