'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMvp } from '@/contexts/MvpContext';

// Dynamically import MermaidDiagram with SSR disabled
const MermaidDiagram = dynamic(() => import('@/components/MermaidDiagram'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 text-muted-foreground">
      <div className="text-center">
        <div className="text-lg mb-2">🔄</div>
        <div>Loading diagram...</div>
      </div>
    </div>
  )
});

interface AppSpecFlowchartProps {
  className?: string;
  viewMode: 'all' | 'mvp' | 'comparison';
}

type DiagramType = 'main' | 'explore' | 'rank' | 'match' | 'connect';

export default function AppSpecFlowchart({ className, viewMode }: AppSpecFlowchartProps) {
  const [activeDiagram, setActiveDiagram] = useState<DiagramType>('main');
  // Removed unused mvpIncluded variable

  const generateMainFlowMermaid = () => {
    return `
flowchart TD
    A[Homepage] --> B[Add Your Own Artist]
    A --> C[Taylor Swift Artist Page]
    B --> D[Upvote Artist Requests]
    D --> E[Submit New Request]
    E --> A
    C --> F[Countdown Preview Box]
    C --> G[Discography Page]
    C --> H[Connect Page]
    F --> I[Showgirl Countdown Activity]
    G --> J[Explore Tab]
    G --> K[Rank Tab]
    G --> L[Match Tab]
    
    style A fill:#e1f5fe
    style F fill:#fff3e0
    style G fill:#f3e5f5
    style H fill:#fce4ec
    style J fill:#fff3e0
    style K fill:#e8f5e8
    style L fill:#e1f5fe
    `;
  };

  const generateExploreFlowMermaid = () => {
    return `
flowchart TD
    A[Explore Tab] --> B[Co-writers]
    A --> C[Lyrics]
    A --> D[Audio]
    
    B --> E[Select Songwriter]
    C --> F[Select Characteristic]
    D --> G[Select Audio Feature]
    
    E --> H[View Filtered Results]
    F --> H
    G --> H
    
    H --> I[Back to Discography]
    
    style A fill:#fff3e0
    style B fill:#e3f2fd
    style C fill:#f3e5f5
    style D fill:#e8f5e8
    `;
  };

  const generateRankFlowMermaid = () => {
    return `
flowchart TD
    A[Rank Tab] --> B[Album Ranking]
    A --> C[Song Ranking]
    A --> D[Reviews & Notes]
    
    B --> E[Drag & Drop Reorder]
    C --> F[Tap Songs to Rank]
    D --> G[Write Reviews]
    D --> H[Create Notes]
    
    G --> I[Rate 1-5 Stars + Text]
    H --> J[Title + Content + Privacy]
    
    E --> K[Save Rankings]
    F --> K
    I --> K
    J --> K
    
    K --> L[Share Rankings]
    L --> M[Back to Discography]
    
    style A fill:#e8f5e8
    style B fill:#e1f5fe
    style C fill:#fff3e0
    style D fill:#f3e5f5
    style G fill:#fff9c4
    style H fill:#f3e5f5
    `;
  };

  const generateConnectFlowMermaid = () => {
    return `
flowchart TD
    A[Connect Page] --> B[Showgirl Countdown]
    A --> C[Eras Tour Reunion]
    A --> D[The Travis Era]
    A --> E[Arcade]
    A --> F[Mix and Mingle]
    
    B --> G[Prediction Activity]
    C --> H[Authenticate Alumni]
    D --> I[Engagement clowning]
    E --> J[Do You Even Swift Quiz]
    F --> K[Interactive Map]
    
    G --> L[Back to Artist Page]
    H --> L
    I --> L
    J --> L
    K --> L
    
    style A fill:#fce4ec
    style B fill:#e1f5fe
    style C fill:#f3e5f5
    style D fill:#fff3e0
    style E fill:#e8f5e8
    style F fill:#f0f4c3
    `;
  };

  const generateMatchFlowMermaid = () => {
    return `
flowchart TD
    A[Match Tab] --> B[Album Comparison]
    A --> C[Song Comparison]
    A --> D[Friend Matching]
    
    B --> E[View Other Users' Rankings]
    C --> F[Compare Song Rankings]
    D --> G[Find Similar Taste]
    
    E --> H[Calculate Similarity]
    F --> H
    G --> H
    
    H --> I[Back to Discography]
    
    style A fill:#e1f5fe
    style B fill:#e1f5fe
    style C fill:#fff3e0
    style D fill:#f3e5f5
    `;
  };

  const getMermaidCode = () => {
    switch (activeDiagram) {
      case 'main':
        return generateMainFlowMermaid();
      case 'explore':
        return generateExploreFlowMermaid();
      case 'rank':
        return generateRankFlowMermaid();
      case 'match':
        return generateMatchFlowMermaid();
      case 'connect':
        return generateConnectFlowMermaid();
      default:
        return generateMainFlowMermaid();
    }
  };

  const getDiagramTitle = () => {
    switch (activeDiagram) {
      case 'main':
        return 'Main App Flow';
      case 'explore':
        return 'Explore Tab - Research Features';
      case 'rank':
        return 'Rank Tab - Album & Song Rankings';
      case 'match':
        return 'Match Tab - Compare Rankings';
      case 'connect':
        return 'Connect Page - Community Activities';
      default:
        return 'Main App Flow';
    }
  };

  const handleDiagramChange = (diagramType: DiagramType) => {
    setActiveDiagram(diagramType);
  };

  return (
    <div className={className}>
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">App User Flow</h2>
          <p className="text-muted-foreground">Interactive flowchart showing the complete user journey</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-muted rounded-lg p-1 flex gap-1">
            <Button
              variant={activeDiagram === 'main' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleDiagramChange('main')}
            >
              Main Flow
            </Button>
            <Button
              variant={activeDiagram === 'explore' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleDiagramChange('explore')}
            >
              Explore Tab
            </Button>
            <Button
              variant={activeDiagram === 'rank' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleDiagramChange('rank')}
            >
              Rank Tab
            </Button>
            <Button
              variant={activeDiagram === 'match' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleDiagramChange('match')}
            >
              Match Tab
            </Button>
            <Button
              variant={activeDiagram === 'connect' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleDiagramChange('connect')}
            >
              Connect Page
            </Button>
          </div>
        </div>

        {/* View Mode Indicator */}
        {viewMode === 'mvp' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">🎯 MVP Mode Active</h3>
            <p className="text-sm text-green-800">
              Showing only MVP features in the flowchart. Switch to &quot;All Features&quot; or &quot;MVP Toggle&quot; to see the complete specification.
            </p>
          </div>
        )}

        {/* Diagram */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">{getDiagramTitle()}</h3>
          <MermaidDiagram 
            key={activeDiagram}
            chart={getMermaidCode()} 
            className="min-h-[400px]"
          />
        </div>
      </Card>
    </div>
  );
}
