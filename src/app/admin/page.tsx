'use client';

import { useState } from 'react';
import AppSpecTable from '@/components/AppSpecTable';
import AppSpecFlowchart from '@/components/AppSpecFlowchart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type ViewType = 'table' | 'flowchart';

export default function DocumentationPage() {
  const [activeView, setActiveView] = useState<ViewType>('table');

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

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
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
        </div>

        {/* Content */}
        {activeView === 'table' ? (
          <AppSpecTable />
        ) : (
          <AppSpecFlowchart />
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Built with Next.js and shadcn/ui • Music Besties Admin Panel</p>
          <p className="mt-2">
            <strong>Single Source of Truth:</strong> Changes to the data automatically sync between both views
          </p>
          <p className="mt-1">
            <strong>Foundation:</strong> This admin panel can be extended with additional development tools and features
          </p>
        </div>
      </div>
    </div>
  );
}
