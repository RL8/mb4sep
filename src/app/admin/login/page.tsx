'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // In a real implementation, this would make an API call to verify credentials
      // For demo purposes, we'll use environment variables
      const validUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
      const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

      if (username === validUsername && password === validPassword) {
        // Set admin session cookies
        document.cookie = `admin-token=${process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN || 'demo-token'}; path=/; secure; samesite=strict`;
        document.cookie = `admin-session=${Date.now()}; path=/; secure; samesite=strict`;
        
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
              MB
            </div>
            <CardTitle className="text-2xl">Music Besties</CardTitle>
          </div>
          <CardDescription>Admin Panel Access</CardDescription>
          {!isProduction && (
            <Badge variant="outline" className="w-fit mx-auto">
              Development Mode
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          {!isProduction && (
            <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-900 mb-2">Development Mode</h4>
              <div className="text-xs text-yellow-800 space-y-1">
                <p><strong>Username:</strong> admin</p>
                <p><strong>Password:</strong> admin123</p>
                <p className="mt-2">In production, this would require proper authentication.</p>
              </div>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              onClick={() => router.push('/')}
              className="w-full"
            >
              Back to Main App
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
