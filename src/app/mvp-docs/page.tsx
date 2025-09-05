'use client';

import { useState } from 'react';
import MvpSpecTable from '@/components/MvpSpecTable';
import MvpSpecFlowchart from '@/components/MvpSpecFlowchart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type ViewType = 'table' | 'flowchart';

export default function MvpDocumentationPage() {
  const [activeView, setActiveView] = useState<ViewType>('table');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Taylor Swift Fan App</h1>
          <p className="text-xl text-muted-foreground mb-2">MVP Documentation</p>
          <p className="text-sm text-muted-foreground">
            Minimum Viable Product specification, core features, and launch strategy
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
          <MvpSpecTable />
        ) : (
          <MvpSpecFlowchart />
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Built with Next.js and shadcn/ui • Taylor Swift Fan App MVP</p>
          <p className="mt-2">
            <strong>MVP Focus:</strong> Core ranking functionality and monetization for rapid launch
          </p>
          <p className="mt-1">
            <strong>Launch Strategy:</strong> Freemium model with 3 albums + 13 songs free tier
          </p>
        </div>
      </div>
    </div>
  );
}
