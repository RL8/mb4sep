'use client';

import { useState } from 'react';
import UnifiedSpecTable from '@/components/UnifiedSpecTable';
import AppSpecFlowchart from '@/components/AppSpecFlowchart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MvpProvider, useMvp } from '@/contexts/MvpContext';

type ViewType = 'table' | 'flowchart';
type ViewMode = 'all' | 'mvp' | 'comparison';

function SpecificationContent() {
  const [activeView, setActiveView] = useState<ViewType>('table');
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const { mvpCount, allSectionsCount } = useMvp();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Music Besties</h1>
          <p className="text-xl text-muted-foreground mb-2">Admin Panel</p>
          <p className="text-sm text-muted-foreground">
            App specification, workflow documentation, and development tools
          </p>
        </div>

        {/* MVP Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{allSectionsCount}</div>
            <div className="text-sm text-muted-foreground">Total Features</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{mvpCount}</div>
            <div className="text-sm text-muted-foreground">MVP Features</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{allSectionsCount - mvpCount}</div>
            <div className="text-sm text-muted-foreground">Future Features</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{Math.round((mvpCount / allSectionsCount) * 100)}%</div>
            <div className="text-sm text-muted-foreground">MVP Coverage</div>
          </Card>
        </div>

        {/* View and Mode Toggles */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          {/* View Toggle */}
          <Card className="p-1">
            <div className="flex gap-1">
              <Button
                variant={activeView === 'table' ? 'default' : 'ghost'}
                onClick={() => setActiveView('table')}
                className="px-6"
              >
                📊 Table View
              </Button>
              <Button
                variant={activeView === 'flowchart' ? 'default' : 'ghost'}
                onClick={() => setActiveView('flowchart')}
                className="px-6"
              >
                🔄 Flowchart View
              </Button>
            </div>
          </Card>

          {/* MVP Mode Toggle */}
          <Card className="p-1">
            <div className="flex gap-1">
              <Button
                variant={viewMode === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('all')}
              >
                All Features
              </Button>
              <Button
                variant={viewMode === 'mvp' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mvp')}
              >
                MVP Only
              </Button>
              <Button
                variant={viewMode === 'comparison' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('comparison')}
              >
                MVP Toggle
              </Button>
            </div>
          </Card>
        </div>

        {/* Content */}
        {activeView === 'table' ? (
          <UnifiedSpecTable viewMode={viewMode} />
        ) : (
          <AppSpecFlowchart viewMode={viewMode} />
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Built with Next.js and shadcn/ui • Music Besties Admin Panel</p>
          <p className="mt-2">
            <strong>Unified Specification:</strong> Single table with MVP toggle functionality for dynamic scoping
          </p>
          <p className="mt-1">
            <strong>MVP Management:</strong> Use checkboxes to include/exclude features and see real-time impact on your MVP scope
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DocumentationPage() {
  return (
    <MvpProvider>
      <SpecificationContent />
    </MvpProvider>
  );
}
