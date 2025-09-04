'use client';

import { useEffect, useRef } from 'react';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export default function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMermaid = async () => {
      try {
        // Use dynamic import with proper error handling
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;
        
        // Initialize Mermaid with stable configuration
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true
          },
          securityLevel: 'loose'
        });

        // Clear previous content
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = '';
          
          // Generate unique ID for each diagram
          const diagramId = `mermaid-diagram-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          
          // Render the diagram
          const { svg } = await mermaid.render(diagramId, chart);
          mermaidRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Failed to load Mermaid:', error);
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = `
            <div class="flex items-center justify-center h-32 text-muted-foreground border border-dashed rounded">
              <div class="text-center">
                <div class="text-lg mb-2">⚠️</div>
                <div>Diagram failed to load</div>
                <div class="text-sm mt-1">Check console for details</div>
              </div>
            </div>
          `;
        }
      }
    };

    loadMermaid();
  }, [chart]);

  return (
    <div 
      ref={mermaidRef} 
      className={`mermaid-container ${className || ''}`}
      style={{ minHeight: '200px' }}
    />
  );
}
