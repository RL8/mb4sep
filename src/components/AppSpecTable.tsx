'use client';

import { appSpecification, getAllSections, AppSection } from '@/data/app-specification';
import { Card } from '@/components/ui/card';

interface AppSpecTableProps {
  className?: string;
}

export default function AppSpecTable({ className }: AppSpecTableProps) {
  const allSections = getAllSections();

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
                  <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {source}
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
    </tr>
  );

  return (
    <div className={className}>
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">App Specification - Table Format</h2>
          <p className="text-muted-foreground">Comprehensive workflow documentation with design system integration</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">6</div>
            <div className="text-sm text-muted-foreground">Main Sections</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">3</div>
            <div className="text-sm text-muted-foreground">Discography Tabs</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">12</div>
            <div className="text-sm text-muted-foreground">Connect Activities</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">5</div>
            <div className="text-sm text-muted-foreground">Ranking Features</div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full">
            <thead className="bg-muted sticky top-0 z-10">
              <tr>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted">
                  Section
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
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allSections.map(renderSection)}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
