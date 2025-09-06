'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface UserActivity {
  id: string;
  username: string;
  activity: string;
  timestamp: string;
  points: number;
  category: 'ranking' | 'prediction' | 'review' | 'social';
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  totalPoints: number;
  activities: number;
  lastActive: string;
  badges: string[];
}

interface UsageStats {
  totalUsers: number;
  activeUsers: number;
  totalActivities: number;
  averageSessionTime: number;
  topCategories: Array<{ category: string; count: number }>;
}

export default function AnalyticsPage() {
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  // Mock data generation
  const generateMockData = () => {
    const activities: UserActivity[] = [
      {
        id: '1',
        username: 'swiftie_forever',
        activity: 'Ranked albums: Fearless, 1989, Reputation',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        points: 15,
        category: 'ranking'
      },
      {
        id: '2',
        username: 'taylor_nation',
        activity: 'Made prediction for Life of a Showgirl',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        points: 25,
        category: 'prediction'
      },
      {
        id: '3',
        username: 'music_lover_23',
        activity: 'Wrote review for Midnights album',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        points: 10,
        category: 'review'
      },
      {
        id: '4',
        username: 'swiftie_forever',
        activity: 'Shared ranking with friends',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        points: 5,
        category: 'social'
      },
      {
        id: '5',
        username: 'taylor_fan_2024',
        activity: 'Completed song ranking challenge',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        points: 20,
        category: 'ranking'
      }
    ];

    const leaderboardData: LeaderboardEntry[] = [
      {
        rank: 1,
        username: 'swiftie_forever',
        totalPoints: 1250,
        activities: 45,
        lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        badges: ['🏆', '⭐', '🎯']
      },
      {
        rank: 2,
        username: 'taylor_nation',
        totalPoints: 1100,
        activities: 38,
        lastActive: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        badges: ['⭐', '🎯']
      },
      {
        rank: 3,
        username: 'music_lover_23',
        totalPoints: 950,
        activities: 32,
        lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        badges: ['🎯']
      },
      {
        rank: 4,
        username: 'taylor_fan_2024',
        totalPoints: 800,
        activities: 28,
        lastActive: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        badges: ['⭐']
      },
      {
        rank: 5,
        username: 'swift_superfan',
        totalPoints: 750,
        activities: 25,
        lastActive: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        badges: []
      }
    ];

    const stats: UsageStats = {
      totalUsers: 1247,
      activeUsers: 89,
      totalActivities: 342,
      averageSessionTime: 12.5,
      topCategories: [
        { category: 'ranking', count: 156 },
        { category: 'prediction', count: 89 },
        { category: 'review', count: 67 },
        { category: 'social', count: 30 }
      ]
    };

    setUserActivities(activities);
    setLeaderboard(leaderboardData);
    setUsageStats(stats);
    setIsLoading(false);
  };

  useEffect(() => {
    generateMockData();
  }, [selectedTimeframe]);

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ranking': return 'bg-blue-100 text-blue-800';
      case 'prediction': return 'bg-purple-100 text-purple-800';
      case 'review': return 'bg-green-100 text-green-800';
      case 'social': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ranking': return '📊';
      case 'prediction': return '🎯';
      case 'review': return '💬';
      case 'social': return '🤝';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Analytics & Leaderboards</h1>
        <p className="text-muted-foreground mt-2">
          Monitor user engagement, track activities, and manage leaderboards
        </p>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2">
        {(['24h', '7d', '30d'] as const).map((timeframe) => (
          <Button
            key={timeframe}
            variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeframe(timeframe)}
          >
            {timeframe}
          </Button>
        ))}
      </div>

      {/* Usage Statistics */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-1">{usageStats?.totalUsers}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600 mb-1">{usageStats?.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users ({selectedTimeframe})</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600 mb-1">{usageStats?.totalActivities}</div>
              <div className="text-sm text-muted-foreground">Total Activities</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600 mb-1">{usageStats?.averageSessionTime}m</div>
              <div className="text-sm text-muted-foreground">Avg Session Time</div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>🏆 Leaderboard</CardTitle>
            <CardDescription>Top users by points and activity</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className="flex items-center gap-3 p-3 border rounded hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">#{entry.rank}</span>
                      <div className="flex gap-1">
                        {entry.badges.map((badge, i) => (
                          <span key={i} className="text-sm">{badge}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{entry.username}</div>
                      <div className="text-sm text-muted-foreground">
                        {entry.totalPoints} points • {entry.activities} activities
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTimeAgo(entry.lastActive)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>📈 Recent Activity</CardTitle>
            <CardDescription>Latest user actions and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded">
                    <Skeleton className="h-8 w-8" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {userActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 border rounded hover:bg-muted/50">
                    <div className="text-2xl">{getCategoryIcon(activity.category)}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{activity.username}</div>
                      <div className="text-xs text-muted-foreground">{activity.activity}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(activity.category)}>
                        {activity.category}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium">+{activity.points}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatTimeAgo(activity.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activity Categories */}
      {usageStats && (
        <Card>
          <CardHeader>
            <CardTitle>📊 Activity Breakdown</CardTitle>
            <CardDescription>User engagement by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {usageStats.topCategories.map((category) => (
                <div key={category.category} className="text-center p-4 border rounded-lg">
                  <div className="text-2xl mb-2">{getCategoryIcon(category.category)}</div>
                  <div className="text-lg font-bold text-primary">{category.count}</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {category.category} Activities
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Incentive Management */}
      <Card>
        <CardHeader>
          <CardTitle>🎁 Incentive Management</CardTitle>
          <CardDescription>Configure rewards and gamification elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Point System</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Album Ranking:</span>
                  <span className="font-medium">15 points</span>
                </div>
                <div className="flex justify-between">
                  <span>Song Ranking:</span>
                  <span className="font-medium">10 points</span>
                </div>
                <div className="flex justify-between">
                  <span>Prediction:</span>
                  <span className="font-medium">25 points</span>
                </div>
                <div className="flex justify-between">
                  <span>Review/Note:</span>
                  <span className="font-medium">10 points</span>
                </div>
                <div className="flex justify-between">
                  <span>Social Share:</span>
                  <span className="font-medium">5 points</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Badges</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>🏆</span>
                  <span>Top Ranker (1000+ points)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⭐</span>
                  <span>Active User (50+ activities)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎯</span>
                  <span>Prediction Master (10+ predictions)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💬</span>
                  <span>Reviewer (20+ reviews)</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Challenges</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-50 rounded">
                  <div className="font-medium">Weekly Ranking</div>
                  <div className="text-xs text-muted-foreground">Rank all albums this week</div>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <div className="font-medium">Prediction Streak</div>
                  <div className="text-xs text-muted-foreground">Make 5 predictions in a row</div>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <div className="font-medium">Social Butterfly</div>
                  <div className="text-xs text-muted-foreground">Share 10 rankings</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
