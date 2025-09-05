'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import MermaidDiagram from './MermaidDiagram';

export default function MvpSpecFlowchart() {
  const mvpFlowchart = `
    graph TD
        A[📱 Landing Page] --> B[🎵 Start Ranking]
        B --> C{User Type?}
        
        C -->|Free User| D[📊 Free Tier Limits]
        C -->|Premium User| E[🎯 Full Access]
        
        D --> F[Rank 3 Albums]
        F --> G[Rank 13 Songs]
        G --> H[📚 Limited Knowledge Base]
        H --> I[💬 Reviews & Notes on Ranked Items]
        I --> J[🔗 Generate Shareable Link]
        J --> K{Want More?}
        
        E --> L[Rank Entire Discography]
        L --> M[📚 Full Knowledge Base]
        M --> N[💬 Reviews & Notes on Any Item]
        N --> O[👥 Full Community Access]
        O --> P[🔗 Advanced Sharing]
        
        K -->|Yes| Q[💰 Upgrade Prompt]
        K -->|No| R[🎮 Prediction Game]
        
        Q --> S[💳 Payment Flow]
        S --> T[✅ Premium Features Unlocked]
        T --> E
        
        R --> U[📊 View Results]
        U --> V[👥 Limited Social Features]
        V --> W[📈 7-Day History]
        
        P --> X[📊 Advanced Analytics]
        X --> Y[📈 Unlimited History]
        Y --> Z[🎯 Full Feature Access]
        
        style A fill:#e1f5fe
        style B fill:#f3e5f5
        style D fill:#fff3e0
        style E fill:#e8f5e8
        style Q fill:#fff8e1
        style S fill:#fce4ec
        style T fill:#e8f5e8
        style R fill:#f1f8e9
        style Z fill:#e8f5e8
    `;

  const userJourneyFlowchart = `
    graph LR
        A[👤 New User] --> B[📱 Landing Page]
        B --> C[🎯 Start Ranking]
        C --> D[📊 Complete Initial Ranking]
        D --> E[💬 Add Notes]
        E --> F[🔗 Share Rankings]
        F --> G{Engaged?}
        
        G -->|Yes| H[🎮 Try Prediction Game]
        G -->|No| I[👋 Exit]
        
        H --> J[📚 Explore Knowledge Base]
        J --> K{Want More Content?}
        
        K -->|Yes| L[💰 Upgrade to Premium]
        K -->|No| M[🔄 Return Later]
        
        L --> N[🎯 Full Access Unlocked]
        N --> O[👥 Community Features]
        O --> P[📈 Advanced Analytics]
        
        M --> Q[📊 View History]
        Q --> R[🔗 Share Updates]
        R --> S[🎮 More Games]
        
        style A fill:#e3f2fd
        style B fill:#e1f5fe
        style C fill:#f3e5f5
        style D fill:#e8f5e8
        style E fill:#fff3e0
        style F fill:#fce4ec
        style H fill:#f1f8e9
        style L fill:#fff8e1
        style N fill:#e8f5e8
        style O fill:#e0f2f1
        style P fill:#f3e5f5
    `;

  const monetizationFlowchart = `
    graph TD
        A[👤 Free User] --> B[🎵 Use Free Features]
        B --> C{Reach Limits?}
        
        C -->|No| D[🔄 Continue Using]
        C -->|Yes| E[💰 Upgrade Prompt]
        
        D --> B
        
        E --> F{Interested?}
        F -->|No| G[👋 Stay Free]
        F -->|Yes| H[💳 Payment Flow]
        
        G --> I[📊 Limited Features]
        I --> J{Change Mind?}
        J -->|Yes| E
        J -->|No| K[📈 Track for Re-engagement]
        
        H --> L[✅ Premium Activated]
        L --> M[🎯 Full Features]
        M --> N[👥 Community Access]
        N --> O[📊 Advanced Analytics]
        O --> P[🔄 High Engagement]
        
        P --> Q{Churn Risk?}
        Q -->|Yes| R[📧 Retention Campaign]
        Q -->|No| S[💎 Loyal Customer]
        
        R --> T{Re-engaged?}
        T -->|Yes| P
        T -->|No| U[❌ Churned User]
        
        style A fill:#e3f2fd
        style E fill:#fff8e1
        style H fill:#fce4ec
        style L fill:#e8f5e8
        style M fill:#e0f2f1
        style N fill:#f3e5f5
        style O fill:#e1f5fe
        style S fill:#e8f5e8
        style U fill:#ffebee
    `;

  const [activeFlowchart, setActiveFlowchart] = useState('mvp');

  return (
    <div className="space-y-6">
      {/* Flowchart Selection */}
      <Card className="p-4">
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setActiveFlowchart('mvp')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeFlowchart === 'mvp'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            🎯 MVP Core Flow
          </button>
          <button
            onClick={() => setActiveFlowchart('journey')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeFlowchart === 'journey'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            👤 User Journey
          </button>
          <button
            onClick={() => setActiveFlowchart('monetization')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeFlowchart === 'monetization'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            💰 Monetization Flow
          </button>
        </div>
      </Card>

      {/* Flowchart Content */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">
            {activeFlowchart === 'mvp' && '🎯 MVP Core Feature Flow'}
            {activeFlowchart === 'journey' && '👤 User Journey Flow'}
            {activeFlowchart === 'monetization' && '💰 Monetization & Conversion Flow'}
          </h2>
          <p className="text-muted-foreground text-sm">
            {activeFlowchart === 'mvp' && 'Core MVP features and user flow from landing to premium conversion'}
            {activeFlowchart === 'journey' && 'Complete user journey from discovery to engagement and retention'}
            {activeFlowchart === 'monetization' && 'Free-to-premium conversion strategy and retention flow'}
          </p>
        </div>
        
        <MermaidDiagram 
          chart={activeFlowchart === 'mvp' ? mvpFlowchart : 
                 activeFlowchart === 'journey' ? userJourneyFlowchart : 
                 monetizationFlowchart} 
        />
      </Card>

      {/* MVP Feature Breakdown */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">MVP Feature Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-3 text-green-600">✅ Included in MVP</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Core ranking system (3 albums + 13 songs free)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Basic knowledge base access</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>User notes and comments</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Shareable links for viral growth</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Prediction game (LOAS album)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Premium upgrade flow</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Basic social features</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3 text-orange-600">⏳ Post-MVP (Phase 2)</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-orange-500">⏳</span>
                <span>Advanced mini-games</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">⏳</span>
                <span>Eras Tour alumni features</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">⏳</span>
                <span>Advanced community features</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">⏳</span>
                <span>Real-world meetups</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">⏳</span>
                <span>Multiple artist support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">⏳</span>
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">⏳</span>
                <span>Complex prediction games</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Launch Timeline */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">MVP Launch Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="font-semibold">Week 1-2: Pre-Launch</h3>
              <p className="text-sm text-muted-foreground">Early access beta, feedback collection, pricing validation</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="font-semibold">Week 3-4: Soft Launch</h3>
              <p className="text-sm text-muted-foreground">Limited release (500 users), early bird pricing, word of mouth</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="font-semibold">Week 5-6: Full Launch</h3>
              <p className="text-sm text-muted-foreground">Public release, launch specials, marketing push, press outreach</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
