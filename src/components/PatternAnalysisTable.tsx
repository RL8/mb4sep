'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PatternAnalysisTable() {
  const patternAnalysis = [
    {
      id: 'forms',
      category: 'Component Reuse',
      pattern: 'Form Components',
      description: 'Shared form elements across features',
      mvpUsage: ['Reviews & Notes System', 'User Management', 'Prediction Game'],
      appSpecUsage: ['Add Your Own Artist', 'Reviews & Notes System', 'User Management'],
      sharedComponents: ['FormField', 'FormButton', 'FormValidation', 'CharacterCounter'],
      dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
      consistency: 'High - All forms use same validation and styling patterns'
    },
    {
      id: 'buttons',
      category: 'Component Reuse',
      pattern: 'Button Components',
      description: 'Consistent button styling and behavior',
      mvpUsage: ['Landing Page', 'Premium Upgrade', 'Prediction Game', 'Shareable Links'],
      appSpecUsage: ['Homepage', 'Add Your Own Artist', 'Discography', 'Connect'],
      sharedComponents: ['PrimaryButton', 'SecondaryButton', 'IconButton', 'LoadingButton'],
      dependencies: ['shadcn/ui button component'],
      consistency: 'High - All buttons use shadcn/ui design system'
    },
    {
      id: 'loading-states',
      category: 'UX Patterns',
      pattern: 'Loading States',
      description: 'Consistent loading feedback across features',
      mvpUsage: ['Prediction Game', 'Ranking Interface', 'Knowledge Base'],
      appSpecUsage: ['Discography', 'Connect Page', 'Ranking Features'],
      sharedComponents: ['LoadingSpinner', 'ProgressBar', 'SkeletonLoader'],
      dependencies: ['lucide-react', 'framer-motion'],
      consistency: 'Medium - Need standardized loading patterns'
    },
    {
      id: 'drag-drop',
      category: 'Interaction Patterns',
      pattern: 'Drag and Drop',
      description: 'Consistent drag-and-drop behavior',
      mvpUsage: ['Ranking Interface'],
      appSpecUsage: ['Album Ranking Mode', 'Song Ranking Mode'],
      sharedComponents: ['DraggableItem', 'DropZone', 'DragHandle'],
      dependencies: ['@dnd-kit/core', '@dnd-kit/sortable'],
      consistency: 'High - Same drag-and-drop logic across ranking features'
    },
    {
      id: 'navigation',
      category: 'UX Patterns',
      pattern: 'Navigation Patterns',
      description: 'Consistent navigation between features',
      mvpUsage: ['All MVP features'],
      appSpecUsage: ['Homepage', 'Discography', 'Connect', 'All sub-features'],
      sharedComponents: ['NavItem', 'Breadcrumb', 'BackButton', 'TabNavigation'],
      dependencies: ['next/navigation', 'shadcn/ui navigation components'],
      consistency: 'Medium - Need standardized navigation patterns'
    },
    {
      id: 'error-handling',
      category: 'System Patterns',
      pattern: 'Error Handling',
      description: 'Consistent error display and recovery',
      mvpUsage: ['All MVP features'],
      appSpecUsage: ['All App Spec features'],
      sharedComponents: ['ErrorBoundary', 'ErrorMessage', 'ErrorFallback', 'RetryButton'],
      dependencies: ['react-error-boundary', '@sentry/nextjs'],
      consistency: 'High - Centralized error handling strategy'
    },
    {
      id: 'validation',
      category: 'System Patterns',
      pattern: 'Input Validation',
      description: 'Consistent validation feedback',
      mvpUsage: ['Reviews & Notes', 'User Management', 'Prediction Game'],
      appSpecUsage: ['Add Your Own Artist', 'Reviews & Notes', 'User Management'],
      sharedComponents: ['ValidationMessage', 'FieldError', 'SuccessMessage'],
      dependencies: ['zod', 'react-hook-form'],
      consistency: 'High - All validation uses zod schemas'
    },
    {
      id: 'data-persistence',
      category: 'System Patterns',
      pattern: 'Data Persistence',
      description: 'Consistent data storage and retrieval',
      mvpUsage: ['Ranking Interface', 'User History', 'Reviews & Notes'],
      appSpecUsage: ['Ranking Features', 'User Management', 'Reviews & Notes'],
      sharedComponents: ['useLocalStorage', 'useServerState', 'DataSync'],
      dependencies: ['@tanstack/react-query', 'localStorage'],
      consistency: 'Medium - Need standardized data persistence patterns'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Component Reuse':
        return 'bg-blue-100 text-blue-800';
      case 'UX Patterns':
        return 'bg-green-100 text-green-800';
      case 'Interaction Patterns':
        return 'bg-purple-100 text-purple-800';
      case 'System Patterns':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConsistencyColor = (consistency: string) => {
    if (consistency.includes('High')) return 'bg-green-100 text-green-800';
    if (consistency.includes('Medium')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">8</div>
          <div className="text-sm text-muted-foreground">Pattern Categories</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">24</div>
          <div className="text-sm text-muted-foreground">Shared Components</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">6</div>
          <div className="text-sm text-muted-foreground">High Consistency</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">2</div>
          <div className="text-sm text-muted-foreground">Needs Improvement</div>
        </Card>
      </div>

      {/* Main Pattern Analysis Table */}
      <Card className="overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">Cross-Feature Pattern Analysis</h2>
          <p className="text-muted-foreground mb-6">Analysis of component reuse, interaction patterns, and consistency across MVP and App Specification features</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-semibold text-sm uppercase tracking-wide">Pattern</th>
                <th className="text-left p-4 font-semibold text-sm uppercase tracking-wide">Usage Across Features</th>
                <th className="text-left p-4 font-semibold text-sm uppercase tracking-wide">Shared Components</th>
                <th className="text-left p-4 font-semibold text-sm uppercase tracking-wide">Consistency</th>
              </tr>
            </thead>
            <tbody>
              {patternAnalysis.map((pattern) => (
                <tr key={pattern.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(pattern.category)}>
                          {pattern.category}
                        </Badge>
                        <span className="font-semibold">{pattern.pattern}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{pattern.description}</p>
                      <div className="text-xs text-muted-foreground">
                        <strong>Dependencies:</strong> {pattern.dependencies.join(', ')}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-blue-700 mb-2">📱 MVP Usage</h4>
                        <ul className="space-y-1">
                          {pattern.mvpUsage.map((usage, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs">
                              <span className="text-blue-500 font-bold mt-0.5">•</span>
                              <span className="text-muted-foreground">{usage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-700 mb-2">📋 App Spec Usage</h4>
                        <ul className="space-y-1">
                          {pattern.appSpecUsage.map((usage, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs">
                              <span className="text-green-500 font-bold mt-0.5">•</span>
                              <span className="text-muted-foreground">{usage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {pattern.sharedComponents.map((component, index) => (
                        <span key={index} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          {component}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getConsistencyColor(pattern.consistency)}>
                      {pattern.consistency}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Pattern Consistency Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-3 text-green-700">✅ High Consistency Areas</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Form Components:</strong> All forms use react-hook-form + zod validation</li>
              <li><strong>Button Components:</strong> Consistent shadcn/ui design system</li>
              <li><strong>Drag and Drop:</strong> Same @dnd-kit implementation across ranking features</li>
              <li><strong>Error Handling:</strong> Centralized react-error-boundary strategy</li>
              <li><strong>Input Validation:</strong> Standardized zod schemas across all forms</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3 text-yellow-700">⚠️ Needs Improvement</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Loading States:</strong> Standardize loading patterns across features</li>
              <li><strong>Navigation Patterns:</strong> Create consistent navigation components</li>
              <li><strong>Data Persistence:</strong> Standardize data storage and sync patterns</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
