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
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Section
                </th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Purpose & Design
                </th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Content/Functionality
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
