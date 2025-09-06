'use client';

import { useState } from 'react';
import { appSpecification, getAllSections, getMvpSections, AppSection } from '@/data/app-specification';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface UnifiedSpecTableProps {
  className?: string;
}

type ViewMode = 'all' | 'mvp' | 'comparison';

export default function UnifiedSpecTable({ className }: UnifiedSpecTableProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [mvpIncluded, setMvpIncluded] = useState<Record<string, boolean>>({});

  // Initialize MVP state from data
  const initializeMvpState = () => {
    const allSections = getAllSections();
    const state: Record<string, boolean> = {};
    allSections.forEach(section => {
      state[section.id] = section.mvpIncluded || false;
    });
    return state;
  };

  // Initialize state on first render
  if (Object.keys(mvpIncluded).length === 0) {
    setMvpIncluded(initializeMvpState());
  }

  const handleMvpToggle = (sectionId: string, checked: boolean) => {
    setMvpIncluded(prev => ({
      ...prev,
      [sectionId]: checked
    }));
  };

  const getSectionsToDisplay = () => {
    switch (viewMode) {
      case 'mvp':
        return getMvpSections();
      case 'comparison':
        return getAllSections();
      default:
        return getAllSections();
    }
  };

  const getSectionBadgeClass = (type: AppSection['type']) => {
    switch (type) {
      case 'page':
        return 'bg-blue-100 text-blue-800';
      case 'tab':
        return 'bg-purple-100 text-purple-800';
      case 'feature':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeClass = (status?: AppSection['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'coming-soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'brainstorming':
        return 'bg-purple-100 text-purple-800';
      default:
        return '';
    }
  };

  const getStatusIcon = (status?: AppSection['status']) => {
    switch (status) {
      case 'active':
        return '✅';
      case 'coming-soon':
        return '🚧';
      case 'brainstorming':
        return '💭';
      default:
        return '';
    }
  };

  const getMvpBadge = (section: AppSection) => {
    const isIncluded = mvpIncluded[section.id] || section.mvpIncluded;
    if (viewMode === 'comparison') {
      return (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isIncluded}
            onCheckedChange={(checked) => handleMvpToggle(section.id, checked as boolean)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Badge variant={isIncluded ? "default" : "secondary"} className={isIncluded ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
            {isIncluded ? '✅ MVP' : '⏳ Future'}
          </Badge>
        </div>
      );
    }
    return null;
  };

  const renderSection = (section: AppSection) => (
    <tr key={section.id} className="hover:bg-muted/50 transition-colors">
      <td className="p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getSectionBadgeClass(section.type)}`}>
            {section.icon} {section.type}
          </span>
          {section.status && (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusBadgeClass(section.status)}`}>
              {getStatusIcon(section.status)} {section.status.replace('-', ' ').toUpperCase()}
            </span>
          )}
          {getMvpBadge(section)}
          <span className="font-semibold text-foreground">{section.title}</span>
        </div>
      </td>
      <td className="p-4 text-muted-foreground text-sm">
        <div>
          <strong className="text-foreground">Purpose:</strong> {section.purpose}
        </div>
        <div className="mt-1">
          <strong className="text-foreground">Design:</strong> {section.design}
        </div>
      </td>
      <td className="p-4">
        <ul className="space-y-1">
          {section.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </td>
      <td className="p-4">
        {section.technicalPractices ? (
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
        ) : (
          <div className="text-xs text-muted-foreground italic">
            Technical practices not yet defined
          </div>
        )}
      </td>
      <td className="p-4">
        {section.technicalPractices ? (
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
        ) : (
          <div className="text-xs text-muted-foreground italic">
            Pattern analysis not yet defined
          </div>
        )}
      </td>
      <td className="p-4">
        {section.databaseIntegration ? (
          <div className="space-y-3">
            {/* Data Sources */}
            <div>
              <h4 className="text-sm font-semibold text-blue-700 mb-2">🗄️ Data Sources</h4>
              <div className="flex flex-wrap gap-1">
                {section.databaseIntegration.dataSources.map((source, index) => (
                  <span key={index} className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
                    source.verified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {source.verified ? '✅' : '❓'} {source.name}
                    {source.type && (
                      <span className="text-xs opacity-75">({source.type})</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Query Patterns */}
            <div>
              <h4 className="text-sm font-semibold text-green-700 mb-2">🔍 Query Patterns</h4>
              <div className="flex flex-wrap gap-1">
                {section.databaseIntegration.queryPatterns.map((pattern, index) => (
                  <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {pattern}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Security Level */}
            <div>
              <h4 className="text-sm font-semibold text-orange-700 mb-2">🔒 Security Level</h4>
              <span className={`text-xs px-2 py-1 rounded ${
                section.databaseIntegration.securityLevel === 'public' ? 'bg-green-100 text-green-800' :
                section.databaseIntegration.securityLevel === 'authenticated' ? 'bg-blue-100 text-blue-800' :
                section.databaseIntegration.securityLevel === 'premium-only' ? 'bg-purple-100 text-purple-800' :
                'bg-red-100 text-red-800'
              }`}>
                {section.databaseIntegration.securityLevel}
              </span>
            </div>
            
            {/* Performance */}
            <div>
              <h4 className="text-sm font-semibold text-purple-700 mb-2">⚡ Performance</h4>
              <div className="flex flex-wrap gap-1">
                {section.databaseIntegration.performance.map((perf, index) => (
                  <span key={index} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {perf}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Caching */}
            <div>
              <h4 className="text-sm font-semibold text-cyan-700 mb-2">💾 Caching</h4>
              <div className="flex flex-wrap gap-1">
                {section.databaseIntegration.caching.map((cache, index) => (
                  <span key={index} className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded">
                    {cache}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground italic">
            Database integration not yet defined
          </div>
        )}
      </td>
      <td className="p-4">
        {section.testingRequirements ? (
          <div className="space-y-3">
            {/* Core Tests */}
            <div>
              <h4 className="text-sm font-semibold text-blue-700 mb-2">🧪 Core Functionality</h4>
              <ul className="space-y-1">
                {section.testingRequirements.coreTests.map((test, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs">
                    <span className="text-blue-500 font-bold mt-0.5">•</span>
                    <span className="text-muted-foreground">{test}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* User Flow Tests */}
            <div>
              <h4 className="text-sm font-semibold text-green-700 mb-2">🛤️ User Experience</h4>
              <ul className="space-y-1">
                {section.testingRequirements.userFlowTests.map((test, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs">
                    <span className="text-green-500 font-bold mt-0.5">•</span>
                    <span className="text-muted-foreground">{test}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Mobile Tests */}
            <div>
              <h4 className="text-sm font-semibold text-purple-700 mb-2">📱 Mobile & PWA</h4>
              <ul className="space-y-1">
                {section.testingRequirements.mobileTests.map((test, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs">
                    <span className="text-purple-500 font-bold mt-0.5">•</span>
                    <span className="text-muted-foreground">{test}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground italic">
            Testing requirements not yet defined
          </div>
        )}
      </td>
    </tr>
  );

  const sectionsToDisplay = getSectionsToDisplay();
  const allSections = getAllSections();
  const mvpSections = getMvpSections();
  const mvpCount = allSections.filter(s => mvpIncluded[s.id] || s.mvpIncluded).length;

  return (
    <div className={className}>
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Unified App Specification</h2>
              <p className="text-muted-foreground">Complete workflow documentation with MVP scoping</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('all')}
              >
                All Features
              </Button>
              <Button
                variant={viewMode === 'mvp' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('mvp')}
              >
                MVP Only
              </Button>
              <Button
                variant={viewMode === 'comparison' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('comparison')}
              >
                MVP Toggle
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">{allSections.length}</div>
            <div className="text-sm text-muted-foreground">Total Features</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">{mvpCount}</div>
            <div className="text-sm text-muted-foreground">MVP Features</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">{allSections.length - mvpCount}</div>
            <div className="text-sm text-muted-foreground">Future Features</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">{Math.round((mvpCount / allSections.length) * 100)}%</div>
            <div className="text-sm text-muted-foreground">MVP Coverage</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">{allSections.filter(s => s.testingRequirements).length}</div>
            <div className="text-sm text-muted-foreground">Test Coverage</div>
          </div>
        </div>

        {/* View Mode Description */}
        {viewMode === 'comparison' && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">🎯 MVP Toggle Mode</h3>
            <p className="text-sm text-blue-800">
              Use the checkboxes to include/exclude features from your MVP. This allows you to dynamically scope your MVP 
              and see the impact on your feature set. Changes are reflected in real-time in the stats above.
            </p>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full">
            <thead className="bg-muted sticky top-0 z-10">
              <tr>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted">
                  Section {viewMode === 'comparison' && '(MVP Toggle)'}
                </th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted">
                  Purpose & Design
                </th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted">
                  Content/Functionality
                </th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted">
                  Technical Best Practices
                </th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted">
                  Pattern Analysis
                </th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted">
                  Database Integration
                </th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted">
                  Testing Requirements
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sectionsToDisplay.map(renderSection)}
            </tbody>
          </table>
        </div>

        {/* MVP Summary */}
        {viewMode === 'comparison' && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">📋 Current MVP Scope</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">✅ Included in MVP ({mvpCount} features):</h4>
                  <ul className="space-y-1 text-green-700">
                    {allSections
                      .filter(s => mvpIncluded[s.id] || s.mvpIncluded)
                      .slice(0, 5)
                      .map(section => (
                        <li key={section.id}>• {section.title}</li>
                      ))}
                    {mvpCount > 5 && <li>• ... and {mvpCount - 5} more</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-2">⏳ Future Features ({allSections.length - mvpCount} features):</h4>
                  <ul className="space-y-1 text-green-700">
                    {allSections
                      .filter(s => !(mvpIncluded[s.id] || s.mvpIncluded))
                      .slice(0, 5)
                      .map(section => (
                        <li key={section.id}>• {section.title}</li>
                      ))}
                    {(allSections.length - mvpCount) > 5 && <li>• ... and {(allSections.length - mvpCount) - 5} more</li>}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Testing Summary */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">🧪 MVP Testing Strategy</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">🎯 Focus Areas:</h4>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Core functionality works</li>
                    <li>• User flows are intuitive</li>
                    <li>• Mobile experience is smooth</li>
                    <li>• PWA installation works</li>
                    <li>• Payment flow is secure</li>
                    <li>• Basic accessibility</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">⚡ Lean Approach:</h4>
                  <ul className="space-y-1 text-blue-700">
                    <li>• 3 test categories per feature</li>
                    <li>• Focus on user value, not perfection</li>
                    <li>• Manual testing for MVP launch</li>
                    <li>• Automated tests for critical paths</li>
                    <li>• Mobile-first testing priority</li>
                    <li>• Iterate based on user feedback</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">📈 Success Metrics:</h4>
                  <ul className="space-y-1 text-blue-700">
                    <li>• {allSections.filter(s => s.testingRequirements).length} features with test plans</li>
                    <li>• Core user journeys work end-to-end</li>
                    <li>• Mobile app installs successfully</li>
                    <li>• Payment flow completes without errors</li>
                    <li>• Users can complete ranking tasks</li>
                    <li>• Prediction game is engaging</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
