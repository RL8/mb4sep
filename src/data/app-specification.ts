export interface AppSection {
  id: string;
  title: string;
  purpose: string;
  design: string;
  features: string[];
  type: 'page' | 'tab' | 'feature';
  icon: string;
  children?: AppSection[];
  color?: string;
  status?: 'active' | 'coming-soon' | 'brainstorming';
  mvpIncluded?: boolean; // New field for MVP inclusion
  testingRequirements?: {
    coreTests: string[];
    userFlowTests: string[];
    mobileTests: string[];
  };
  technicalPractices?: {
    current: string[];
    improvements: string[];
    dependencies: string[];
    testing: string[];
    sharedComponents: string[];
    userJourney: string[];
  };
  databaseIntegration?: {
    dataSources: Array<{
      name: string;
      verified: boolean;
      type?: 'table' | 'view' | 'function';
    }>;
    queryPatterns: string[];
    securityLevel: 'public' | 'authenticated' | 'premium-only' | 'admin-only';
    performance: string[];
    caching: string[];
  };
}

export const appSpecification: AppSection[] = [
  {
    id: 'homepage',
    title: '1. Homepage',
    purpose: 'To serve as a simple, single-page entry point to the app',
    design: 'A clean, non-scrolling, single-page layout',
    features: [
      'App Name: "Music Besties"',
      'Description: "The app for superfans to create, curate, and connect"',
      'Artist Section: "Current Artist" with "Taylor Swift" and proceed button',
      '"Add Your Own Artist" Button',
      'Floating Action Button (FAB): help button and menu'
    ],
    type: 'page',
    icon: '📱',
    color: '#e1f5fe',
    mvpIncluded: true,
    testingRequirements: {
      coreTests: [
        'Homepage renders and navigation works',
        'Artist selection button leads to Taylor Swift page',
        'FAB (help button) is functional'
      ],
      userFlowTests: [
        'User can get from homepage to ranking interface',
        'Clear path to prediction game',
        'Mobile navigation works smoothly'
      ],
      mobileTests: [
        'Touch targets are large enough (44px minimum)',
        'Mobile-first responsive design works',
        'PWA can be installed on mobile'
      ]
    },
    technicalPractices: {
      current: ['Next.js 15 App Router', 'TypeScript', 'shadcn/ui components', 'Responsive design'],
      improvements: ['Error boundaries with react-error-boundary', 'Lazy loading with dynamic imports', 'SEO optimization with Next.js metadata', 'Performance monitoring with web-vitals'],
      dependencies: ['react-error-boundary', 'web-vitals', 'next/dynamic', 'next-seo'],
      testing: ['Component tests with @testing-library/react', 'E2E tests with Playwright', 'Accessibility tests with @axe-core/react'],
      sharedComponents: ['Button', 'Card', 'Navigation', 'LoadingSpinner'],
      userJourney: ['Entry point for all user flows', 'Artist selection and navigation hub']
    },
    databaseIntegration: {
      dataSources: [
        { name: 'albums', verified: true, type: 'table' },
        { name: 'songs', verified: true, type: 'table' },
        { name: 'user_preferences', verified: false, type: 'table' }
      ],
      queryPatterns: ['static_data', 'user_session'],
      securityLevel: 'public',
      performance: ['preloaded', 'cached'],
      caching: ['static_generation', 'session_storage']
    }
  },
  {
    id: 'add-artist',
    title: '2. Add Your Own Artist Page',
    purpose: 'To collect user requests for new artists with community upvoting system',
    design: 'Feature request style page with upvoting and community feedback',
    features: [
      'Artist request form with name and optional comment',
      'Upvote system for existing artist requests',
      'Community tally showing most requested artists',
      'Submit new artist request button',
      'View existing requests with vote counts'
    ],
    type: 'page',
    icon: '📝',
    color: '#e1f5fe',
    mvpIncluded: false,
    technicalPractices: {
      current: ['Form handling with react-hook-form', 'Input validation with zod', 'Real-time updates'],
      improvements: ['Optimistic updates for better UX', 'Debounced search for artist names', 'Rate limiting for submissions', 'Duplicate detection'],
      dependencies: ['react-hook-form', 'zod', '@tanstack/react-query'],
      testing: ['Form validation tests', 'Upvote interaction tests', 'Duplicate prevention tests'],
      sharedComponents: ['FormInput', 'VoteButton', 'RequestCard', 'LoadingSpinner'],
      userJourney: ['Community contribution entry point', 'Artist request and voting flow']
    },
    databaseIntegration: {
      dataSources: [
        { name: 'artist_requests', verified: false, type: 'table' },
        { name: 'user_votes', verified: false, type: 'table' },
        { name: 'users', verified: false, type: 'table' }
      ],
      queryPatterns: ['real_time_updates', 'aggregated_votes', 'user_submissions'],
      securityLevel: 'authenticated',
      performance: ['optimistic_updates', 'debounced_queries'],
      caching: ['react_query', 'local_storage']
    }
  },
  {
    id: 'artist-page',
    title: '3. Taylor Swift Artist Page',
    purpose: 'To serve as a dedicated landing page for Taylor Swift with prediction game as primary feature',
    design: 'Single-page layout with no scrolling. Back arrow in top-left',
    features: [
      '"Welcome!" greeting',
      'Primary CTA: "Make Your Life of a Showgirl Prediction"',
      'Featured album countdown preview box for "Life of a Showgirl"',
      'Countdown timer (counting down to October 3, 2025, 12:01 a.m. Eastern Time)',
      'Direct shortcut to prediction game (primary action)',
      'Clear path to main discography view (secondary)',
      'Clear path to Connect page (tertiary)'
    ],
    type: 'page',
    icon: '🎤',
    color: '#e1f5fe',
    mvpIncluded: true,
    testingRequirements: {
      coreTests: [
        'Countdown timer shows correct time to October 3, 2025',
        'Primary CTA leads to prediction game',
        'Navigation arrows work properly'
      ],
      userFlowTests: [
        'User can easily start prediction game',
        'Clear path to discography ranking',
        'Countdown creates urgency for prediction'
      ],
      mobileTests: [
        'Countdown timer displays well on mobile',
        'CTA buttons are touch-friendly',
        'Mobile navigation is intuitive'
      ]
    },
    technicalPractices: {
      current: ['Static layout with fixed positioning', 'Countdown timer implementation', 'Navigation routing'],
      improvements: ['Real-time countdown with timezone handling', 'CTA button analytics tracking', 'Progressive enhancement for countdown', 'Accessibility for timer display'],
      dependencies: ['date-fns', 'next/navigation', 'web-vitals'],
      testing: ['Countdown accuracy tests', 'Navigation flow tests', 'Timer accessibility tests'],
      sharedComponents: ['CountdownTimer', 'CTAButton', 'NavigationArrow', 'WelcomeMessage'],
      userJourney: ['Primary prediction game entry point', 'Artist-specific landing and navigation hub']
    },
    databaseIntegration: {
      dataSources: [
        { name: 'albums', verified: true, type: 'table' },
        { name: 'songs', verified: true, type: 'table' },
        { name: 'user_predictions', verified: false, type: 'table' },
        { name: 'analytics_events', verified: false, type: 'table' }
      ],
      queryPatterns: ['static_album_data', 'user_prediction_status', 'analytics_tracking'],
      securityLevel: 'public',
      performance: ['preloaded_album_data', 'lazy_loaded_predictions'],
      caching: ['static_generation', 'session_storage']
    }
  },
  {
    id: 'discography',
    title: '4. Discography Page (Core Experience)',
    purpose: 'To provide comprehensive and interactive view of artist\'s discography as a research tool with prediction integration',
    design: 'Persistent 12-Grid View with bottom navigation and prediction integration',
    features: [
      'Persistent 12-Grid View: Static grid of 12 albums, always visible',
      'Album tiles: color, name, year, song count (no album art)',
      'Bottom Navigation Bar: "Explore," "Rank," and "Match" tabs',
      '12-album grid representing Taylor Swift\'s complete discography',
      'Prediction integration: Show current prediction alongside rankings',
      'Prediction refinement prompts: "Add more rankings to improve accuracy"'
    ],
    type: 'page',
    icon: '🎵',
    color: '#f3e5f5',
    mvpIncluded: true,
    testingRequirements: {
      coreTests: [
        '12-album grid displays correctly',
        'Tab navigation works (Explore, Rank, Match)',
        'Album tiles show color, name, year, song count'
      ],
      userFlowTests: [
        'User can navigate between tabs smoothly',
        'Ranking interface is accessible from grid',
        'Prediction integration works with rankings'
      ],
      mobileTests: [
        'Grid is touch-friendly on mobile',
        'Tab navigation works on mobile',
        'Mobile grid layout is responsive'
      ]
    },
    technicalPractices: {
      current: ['React state management', 'Component composition', 'Grid layout system'],
      improvements: ['Drag-and-drop with @dnd-kit/core', 'Keyboard navigation with focus-trap-react', 'Mobile optimization with touch events', 'Data caching with @tanstack/react-query'],
      dependencies: ['@dnd-kit/core', 'focus-trap-react', '@tanstack/react-query'],
      testing: ['Grid interaction tests', 'Drag-and-drop tests', 'Keyboard navigation tests', 'Mobile touch tests'],
      sharedComponents: ['GridLayout', 'DraggableItem', 'DropZone', 'RankingCard', 'TabNavigation'],
      userJourney: ['Core research and ranking experience', 'Hub for all discography interactions']
    },
    databaseIntegration: {
      dataSources: [
        { name: 'albums', verified: true, type: 'table' },
        { name: 'songs', verified: true, type: 'table' },
        { name: 'user_rankings', verified: false, type: 'table' },
        { name: 'user_predictions', verified: false, type: 'table' }
      ],
      queryPatterns: ['grid_data_loading', 'real_time_rankings', 'prediction_integration'],
      securityLevel: 'authenticated',
      performance: ['preloaded_grid', 'optimistic_updates', 'lazy_loaded_details'],
      caching: ['react_query', 'indexed_db', 'local_storage']
    },
    children: [
      {
        id: 'explore-tab',
        title: '4.1 Explore Tab',
        purpose: 'To provide access to research and discovery features',
        design: 'Sub-navigation bar with three research categories',
        features: [
          'Sub-navigation: "Co-writers," "Lyrics," "Audio"'
        ],
        type: 'tab',
        icon: '🔍',
        color: '#fff3e0',
        children: [
          {
            id: 'co-writers',
            title: '4.1.1 Co-writers Sub-Tab',
            purpose: 'To filter albums based on individual songwriter contributions',
            design: 'Sub-navigation with songwriter names and counts',
            features: [
              'Songwriter names ordered by total contributions (highest to lowest)',
              'Display format: "Jack Antonoff (45)", "Aaron Dessner (32)", etc.',
              'Grid shows songs per album for selected songwriter'
            ],
            type: 'feature',
            icon: '✍️',
            color: '#e3f2fd',
            technicalPractices: {
              current: ['Data aggregation from songs table', 'Dynamic filtering', 'Count calculations'],
              improvements: ['Memoized songwriter calculations', 'Virtual scrolling for large lists', 'Search functionality for songwriters', 'Caching of songwriter data'],
              dependencies: ['@tanstack/react-query', 'use-memo-one'],
              testing: ['Data aggregation tests', 'Filter interaction tests', 'Performance tests for large datasets'],
              sharedComponents: ['SongwriterCard', 'FilterButton', 'CountBadge', 'GridLayout'],
              userJourney: ['Research songwriter contributions', 'Filter albums by collaboration patterns']
            },
            databaseIntegration: {
              dataSources: [
                { name: 'songs', verified: true, type: 'table' },
                { name: 'albums', verified: true, type: 'table' },
                { name: 'songwriters', verified: false, type: 'table' }
              ],
              queryPatterns: ['aggregated_counts', 'filtered_queries', 'join_operations'],
              securityLevel: 'public',
              performance: ['memoized_calculations', 'virtual_scrolling'],
              caching: ['react_query', 'computed_cache']
            }
          },
          {
            id: 'lyrics',
            title: '4.1.2 Lyrics Sub-Tab',
            purpose: 'To filter albums based on lyrical characteristics',
            design: 'Sub-navigation with lyrical characteristics',
            features: [
              'Lyrical characteristics (word count, complexity, etc.)',
              'Grid shows numerical values for selected characteristic'
            ],
            type: 'feature',
            icon: '📝',
            color: '#f3e5f5',
            technicalPractices: {
              current: ['Text analysis calculations', 'Numerical data visualization', 'Characteristic filtering'],
              improvements: ['Client-side text analysis with Web Workers', 'Progressive data loading', 'Interactive charts for trends', 'Export functionality for data'],
              dependencies: ['recharts', 'comlink', 'natural'],
              testing: ['Text analysis accuracy tests', 'Data visualization tests', 'Performance tests for large text datasets'],
              sharedComponents: ['DataChart', 'CharacteristicSelector', 'NumericalDisplay', 'ExportButton'],
              userJourney: ['Analyze lyrical patterns across albums', 'Compare textual characteristics']
            },
            databaseIntegration: {
              dataSources: [
                { name: 'songs', verified: true, type: 'table' },
                { name: 'lyrics_analysis', verified: false, type: 'table' },
                { name: 'text_metrics', verified: false, type: 'view' }
              ],
              queryPatterns: ['text_analysis_queries', 'aggregated_metrics', 'pattern_matching'],
              securityLevel: 'public',
              performance: ['indexed_text_search', 'cached_analysis_results'],
              caching: ['analysis_cache', 'computed_metrics']
            },
            testingRequirements: {
              coreTests: [
                'Text analysis algorithms produce accurate results',
                'Lyrical characteristic calculations are consistent',
                'Data visualization renders correctly'
              ],
              userFlowTests: [
                'Users can filter albums by lyrical characteristics',
                'Grid updates show correct numerical values',
                'Export functionality works properly'
              ],
              mobileTests: [
                'Text analysis performs well on mobile devices',
                'Charts are readable on small screens',
                'Touch interactions work smoothly'
              ]
            }
          },
          {
            id: 'audio',
            title: '4.1.3 Audio Sub-Tab',
            purpose: 'To filter albums based on audio features',
            design: 'Sub-navigation with audio features',
            features: [
              'Audio features (danceability, energy, acousticness)',
              'Grid shows numerical values for selected feature'
            ],
            type: 'feature',
            icon: '🎧',
            color: '#e8f5e8',
            technicalPractices: {
              current: ['Audio feature data processing', 'Numerical visualization', 'Feature comparison'],
              improvements: ['Interactive audio feature charts', 'Audio preview integration', 'Feature correlation analysis', 'Playlist generation based on features'],
              dependencies: ['recharts', 'tone.js', 'howler.js'],
              testing: ['Audio feature calculation tests', 'Chart rendering tests', 'Audio playback tests'],
              sharedComponents: ['AudioChart', 'FeatureSelector', 'AudioPreview', 'PlaylistGenerator'],
              userJourney: ['Analyze musical characteristics', 'Discover songs by audio features']
            },
            databaseIntegration: {
              dataSources: [
                { name: 'songs', verified: true, type: 'table' },
                { name: 'audio_features', verified: false, type: 'table' },
                { name: 'spotify_api', verified: false, type: 'external' }
              ],
              queryPatterns: ['audio_feature_queries', 'correlation_analysis', 'playlist_generation'],
              securityLevel: 'public',
              performance: ['indexed_audio_queries', 'cached_feature_data'],
              caching: ['audio_feature_cache', 'correlation_matrix']
            },
            testingRequirements: {
              coreTests: [
                'Audio feature calculations are accurate',
                'Charts display audio data correctly',
                'Audio preview functionality works'
              ],
              userFlowTests: [
                'Users can filter by audio features',
                'Feature comparison interface is intuitive',
                'Playlist generation produces relevant results'
              ],
              mobileTests: [
                'Audio features load quickly on mobile',
                'Charts are touch-friendly',
                'Audio previews work on mobile devices'
              ]
            }
          }
        ]
      },
      {
        id: 'rank-tab',
        title: '4.2 Rank Tab',
        purpose: 'To provide comprehensive ranking functionality for albums and songs',
        design: 'Mode-based ranking system with album and song ranking capabilities',
        features: [
          'Rank Albums Mode',
          'Rank Songs Mode',
          'Cross-album song ranking',
          'Ranking persistence and sharing'
        ],
        type: 'tab',
        icon: '📊',
        color: '#e8f5e8',
        children: [
          {
            id: 'album-ranking',
            title: '4.2.1 Album Ranking Mode',
            purpose: 'Allow users to rank Taylor Swift albums in their preferred order',
            design: 'Interactive album ranking with drag-and-drop functionality',
            features: [
              'Drag and drop album reordering',
              'Visual feedback with numbered badges',
              'Save and resume ranking progress',
              'Share album rankings with others'
            ],
            type: 'feature',
            icon: '📀',
            color: '#e1f5fe',
            status: 'active',
            mvpIncluded: true,
            testingRequirements: {
              coreTests: [
                'Drag and drop album reordering works',
                'Visual feedback shows numbered rankings',
                'Rankings save automatically'
              ],
              userFlowTests: [
                'User can rank albums intuitively',
                'Rankings persist between sessions',
                'Share functionality works'
              ],
              mobileTests: [
                'Touch drag and drop works on mobile',
                'Mobile ranking interface is usable',
                'Mobile share functionality works'
              ]
            },
            technicalPractices: {
              current: ['Drag and drop with @dnd-kit/core', 'Local state management', 'Visual feedback system'],
              improvements: ['Auto-save with debouncing', 'Undo/redo functionality', 'Keyboard navigation support', 'Mobile touch optimization'],
              dependencies: ['@dnd-kit/core', '@dnd-kit/sortable', 'use-debounce'],
              testing: ['Drag and drop interaction tests', 'State persistence tests', 'Mobile touch tests', 'Keyboard navigation tests'],
              sharedComponents: ['DraggableAlbum', 'DropZone', 'RankingBadge', 'SaveIndicator'],
              userJourney: ['Core album ranking experience', 'Personal preference expression']
            },
            databaseIntegration: {
              dataSources: [
                { name: 'albums', verified: true, type: 'table' },
                { name: 'user_rankings', verified: false, type: 'table' },
                { name: 'ranking_history', verified: false, type: 'table' }
              ],
              queryPatterns: ['real_time_save', 'ranking_retrieval', 'history_tracking'],
              securityLevel: 'authenticated',
              performance: ['optimistic_updates', 'debounced_saves', 'local_state'],
              caching: ['react_query', 'local_storage', 'indexed_db']
            }
          },
          {
            id: 'song-ranking',
            title: '4.2.2 Song Ranking Mode',
            purpose: 'Allow users to rank individual songs across all albums',
            design: 'Cross-album song selection and ranking system',
            features: [
              'Mode selection: "Rank Albums" or "Rank Songs"',
              'Navigate between albums to access different songs',
              'Tap songs to add them to ranking in order',
              'Cross-album selection and ranking',
              'Visual feedback with numbered badges (1, 2, 3...)',
              'Remove songs by tapping ranked songs again',
              'Progress indicator showing ranked song count'
            ],
            type: 'feature',
            icon: '🎵',
            color: '#fff3e0',
            status: 'active',
            technicalPractices: {
              current: ['Cross-album navigation', 'Song selection state management', 'Progress tracking'],
              improvements: ['Virtual scrolling for large song lists', 'Search functionality within songs', 'Bulk selection tools', 'Ranking export options'],
              dependencies: ['@tanstack/react-query', 'react-window', 'fuse.js'],
              testing: ['Cross-album navigation tests', 'Song selection tests', 'Progress tracking tests', 'Performance tests for large datasets'],
              sharedComponents: ['SongCard', 'AlbumNavigator', 'ProgressIndicator', 'RankingBadge'],
              userJourney: ['Cross-album song discovery and ranking', 'Comprehensive music preference expression']
            }
          },
          {
            id: 'ranking-management',
            title: '4.2.3 Ranking Management',
            purpose: 'Provide tools for managing and organizing user rankings',
            design: 'Comprehensive ranking management interface',
            features: [
              'View Rankings button to see current list',
              'Drag and drop to reorder song rankings',
              'Undo/Redo functionality for ranking changes',
              'Clear All option to start over',
              'Automatic save of ranking progress',
              'Resume ranking sessions later'
            ],
            type: 'feature',
            icon: '⚙️',
            color: '#f3e5f5',
            status: 'active',
            technicalPractices: {
              current: ['Command pattern for undo/redo', 'Local storage persistence', 'State management'],
              improvements: ['Command history with memory limits', 'Cloud sync for cross-device access', 'Ranking templates and presets', 'Bulk operations'],
              dependencies: ['immer', 'localforage', '@tanstack/react-query'],
              testing: ['Undo/redo functionality tests', 'Persistence tests', 'State management tests', 'Cross-device sync tests'],
              sharedComponents: ['CommandHistory', 'PersistenceManager', 'BulkActions', 'TemplateSelector'],
              userJourney: ['Ranking management and organization', 'Cross-session ranking continuity']
            }
          },
          {
            id: 'ranking-sharing',
            title: '4.2.4 Ranking Persistence & Sharing',
            purpose: 'Enable users to save, share, and export their rankings',
            design: 'Sharing and export functionality for rankings',
            features: [
              'Automatic save of song rankings',
              'Share rankings with other users',
              'Copy ranking list functionality',
              'Export ranking options',
              'Separate storage for album vs song rankings',
              'Quick access to switch between ranking types'
            ],
            type: 'feature',
            icon: '📤',
            color: '#e8f5e8',
            status: 'active',
            technicalPractices: {
              current: ['Share API integration', 'Clipboard API for copying', 'Export functionality'],
              improvements: ['Social sharing with Open Graph', 'QR code generation for rankings', 'Export to multiple formats', 'Privacy controls for sharing'],
              dependencies: ['qrcode', 'file-saver', 'react-share'],
              testing: ['Sharing functionality tests', 'Export format tests', 'Privacy control tests', 'Cross-platform sharing tests'],
              sharedComponents: ['ShareButton', 'ExportDialog', 'QRCodeGenerator', 'PrivacySettings'],
              userJourney: ['Social sharing of music preferences', 'Export and backup of rankings']
            }
          },
          {
            id: 'reviews-notes-system',
            title: '4.2.5 Reviews & Notes System',
            purpose: 'Two content systems: Reviews (rate + opinions) and Notes (titled personal thoughts)',
            design: 'Separate forms for reviews (1-5 stars + text) and notes (title + content)',
            features: [
              'Reviews: Rate albums/songs 1-5 stars with optional text (1000 chars)',
              'Notes: Create titled entries with personal thoughts (title 100 chars, content 2000 chars)',
              'Privacy controls: Notes can be public or private',
              'Search functionality: Filter notes by title/content',
              'Real-time updates and auto-save',
              'Edit capabilities with timestamp and edit history',
              'Visual feedback with character counters',
              'Separate database tables for reviews and notes'
            ],
            type: 'feature',
            icon: '💬',
            color: '#f3e5f5',
            status: 'active',
            mvpIncluded: true,
            technicalPractices: {
              current: ['Form validation with character limits', 'Auto-save functionality', 'Search and filtering'],
              improvements: ['Rich text editor with markdown support', 'Version history for edits', 'Advanced search with full-text indexing', 'Content moderation tools'],
              dependencies: ['@uiw/react-md-editor', 'fuse.js', 'react-hook-form'],
              testing: ['Form validation tests', 'Auto-save functionality tests', 'Search performance tests', 'Content moderation tests'],
              sharedComponents: ['StarRating', 'RichTextEditor', 'SearchFilter', 'CharacterCounter'],
              userJourney: ['Personal content creation and management', 'Community content sharing and discovery']
            }
          }
        ]
      },
      {
        id: 'match-tab',
        title: '4.3 Match Tab',
        purpose: 'To allow users to compare their rankings with other users',
        design: 'Comparison interface for viewing and matching rankings',
        features: [
          'View other users\' album rankings',
          'View other users\' song rankings',
          'Compare rankings with friends',
          'Find users with similar taste',
          'Ranking compatibility scores'
        ],
        type: 'tab',
        icon: '🔗',
        color: '#e1f5fe',
        children: [
          {
            id: 'album-comparison',
            title: '4.3.1 Album Ranking Comparison',
            purpose: 'Compare album rankings with other users',
            design: 'Side-by-side comparison interface',
            features: [
              'View other users\' album rankings',
              'Side-by-side ranking comparison',
              'Similarity percentage calculation',
              'Find users with similar album taste'
            ],
            type: 'feature',
            icon: '📀',
            color: '#e1f5fe',
            status: 'active',
            technicalPractices: {
              current: ['Similarity algorithm implementation', 'Side-by-side UI layout', 'User ranking data fetching'],
              improvements: ['Advanced similarity algorithms (Spearman correlation)', 'Visual diff highlighting', 'Bulk comparison tools', 'Similarity trend analysis'],
              dependencies: ['@tanstack/react-query', 'd3-scale', 'react-diff-viewer'],
              testing: ['Similarity calculation tests', 'UI comparison tests', 'Performance tests for large user bases'],
              sharedComponents: ['ComparisonView', 'SimilarityIndicator', 'UserSelector', 'DiffHighlighter'],
              userJourney: ['Social comparison and discovery', 'Finding users with similar taste']
            }
          },
          {
            id: 'song-comparison',
            title: '4.3.2 Song Ranking Comparison',
            purpose: 'Compare song rankings with other users',
            design: 'Detailed song ranking comparison interface',
            features: [
              'View other users\' song rankings',
              'Cross-album song comparison',
              'Common favorite songs identification',
              'Taste compatibility scoring'
            ],
            type: 'feature',
            icon: '🎵',
            color: '#fff3e0',
            status: 'active',
            technicalPractices: {
              current: ['Cross-album data aggregation', 'Compatibility scoring algorithms', 'Song ranking visualization'],
              improvements: ['Weighted similarity scoring', 'Playlist generation from common favorites', 'Song recommendation engine', 'Compatibility heat maps'],
              dependencies: ['@tanstack/react-query', 'd3-heatmap', 'ml-matrix'],
              testing: ['Compatibility algorithm tests', 'Cross-album aggregation tests', 'Visualization tests'],
              sharedComponents: ['SongComparison', 'CompatibilityScore', 'CommonFavorites', 'RecommendationEngine'],
              userJourney: ['Deep song-level taste comparison', 'Discovery of shared musical preferences']
            }
          },
          {
            id: 'friend-matching',
            title: '4.3.3 Friend Matching',
            purpose: 'Connect with users who have similar music taste',
            design: 'Social matching system based on rankings',
            features: [
              'Find users with similar rankings',
              'Send friend requests based on compatibility',
              'View mutual favorite albums/songs',
              'Music taste compatibility scores'
            ],
            type: 'feature',
            icon: '👥',
            color: '#f3e5f5',
            status: 'active',
            technicalPractices: {
              current: ['User matching algorithms', 'Friend request system', 'Compatibility scoring'],
              improvements: ['Machine learning-based matching', 'Privacy controls for friend requests', 'Mutual friend discovery', 'Activity-based matching'],
              dependencies: ['@tanstack/react-query', 'ml-kmeans', 'react-query'],
              testing: ['Matching algorithm tests', 'Friend request flow tests', 'Privacy control tests'],
              sharedComponents: ['MatchingEngine', 'FriendRequest', 'CompatibilityCard', 'PrivacySettings'],
              userJourney: ['Social connection through music taste', 'Community building and friendship discovery']
            }
          }
        ]
      }
    ]
  },
  {
    id: 'connect',
    title: '5. Connect Page',
    purpose: 'To provide access to all fan engagement activities and community features',
    design: 'Standalone page with community activity categories and detailed sub-activities',
    features: [
      'Sub-navigation with 5 main activity categories',
      'Each category contains detailed sub-activities with status tracking',
      'Status indicators: Active, Coming Soon, Brainstorming'
    ],
    type: 'page',
    icon: '🤝',
    color: '#fce4ec',
    technicalPractices: {
      current: ['Status tracking system', 'Navigation structure'],
      improvements: ['Activity tracking with basic metrics', 'Navigation state management'],
      dependencies: ['@tanstack/react-query'],
      testing: ['Navigation tests', 'Activity tracking tests'],
      sharedComponents: ['ActivityCard', 'StatusIndicator', 'NavigationMenu', 'CategoryGrid'],
      userJourney: ['Community engagement hub', 'Connects to all social features']
    },
    testingRequirements: {
      coreTests: [
        'Navigation between activity categories works',
        'Status indicators display correctly',
        'Activity cards render properly'
      ],
      userFlowTests: [
        'Users can navigate between different activity types',
        'Status updates are reflected in real-time',
        'Community engagement tracking works'
      ],
      mobileTests: [
        'Mobile navigation is smooth',
        'Activity cards are touch-friendly',
        'Status indicators are visible on small screens'
      ]
    },
    databaseIntegration: {
      dataSources: [
        { name: 'community_activities', verified: false, type: 'table' },
        { name: 'user_engagement', verified: false, type: 'table' },
        { name: 'activity_status', verified: false, type: 'table' }
      ],
      queryPatterns: ['activity_aggregation', 'user_participation', 'status_tracking'],
      securityLevel: 'authenticated',
      performance: ['lazy_loaded_activities', 'cached_status'],
      caching: ['react_query', 'local_storage']
    },
    children: [
      {
        id: 'showgirl-countdown',
        title: '5.1 Showgirl Countdown',
        purpose: 'Activities focused on the upcoming album Life of a Showgirl - now accessible early in user journey',
        design: 'Sub-navigation with prediction, guessing, and community activities',
        features: [
          'Prediction Activity (Active) - Now accessible from artist page',
          'The Guessing Game (Coming Soon)',
          'World\'s Biggest Listen Party (Brainstorming)'
        ],
        type: 'feature',
        icon: '🎵',
        color: '#e1f5fe',
        children: [
          {
            id: 'prediction-activity',
            title: '5.1.1 Prediction Activity',
            purpose: 'AI-powered prediction system that analyzes user taste to predict where LOAS will rank - now first experience',
            design: 'Interactive prediction system with AI analysis, confidence scoring, and accuracy tracking',
            features: [
              'AI-powered taste analysis from existing rankings',
              'Prediction interface (1-10 ranking position)',
              'Confidence scoring and explanation',
              'Personalized narrative generation',
              'Quick taste profile for new users (3 albums)',
              'Mark predictions as "sounds about right" or "totally way off"',
              'Declare accuracy once album is released',
              'Game state ready for actual results when album releases'
            ],
            type: 'feature',
            icon: '🎯',
            color: '#e8f5e8',
            status: 'active',
            mvpIncluded: true,
            testingRequirements: {
              coreTests: [
                'AI prediction algorithm works with user rankings',
                'Confidence scoring displays correctly',
                'User can mark prediction as accurate/inaccurate'
              ],
              userFlowTests: [
                'User can make prediction based on their rankings',
                'Prediction feels personalized and accurate',
                'Feedback collection is simple and clear'
              ],
              mobileTests: [
                'Prediction interface works well on mobile',
                'Touch-friendly feedback buttons',
                'Mobile prediction calculation is fast enough'
              ]
            },
            technicalPractices: {
              current: ['AI prediction algorithms', 'Confidence scoring system', 'User feedback collection'],
              improvements: ['Machine learning model training', 'Real-time prediction updates', 'A/B testing for prediction accuracy', 'Gamification elements'],
              dependencies: ['@tensorflow/tfjs', 'ml-matrix', 'framer-motion'],
              testing: ['Prediction algorithm tests', 'Confidence scoring tests', 'User feedback tests', 'A/B testing framework'],
              sharedComponents: ['PredictionEngine', 'ConfidenceIndicator', 'FeedbackCollector', 'GamificationBadges'],
              userJourney: ['AI-powered taste prediction', 'Gamified prediction accuracy tracking']
            }
          },
          {
            id: 'guessing-game',
            title: '5.1.2 The Guessing Game',
            purpose: 'Fan engagement activity where users can guess the official single from upcoming album',
            design: 'Prediction system with prizes and badges',
            features: [
              'Guess the official single from upcoming album',
              'Predict if music video will be released alongside it',
              'Winners get special in-app badges',
              'Real-world prizes for winners'
            ],
            type: 'feature',
            icon: '🎲',
            color: '#fff3e0',
            status: 'coming-soon',
            technicalPractices: {
              current: ['Prediction submission system', 'Badge management', 'Prize tracking'],
              improvements: ['Real-time leaderboards', 'Social sharing of predictions', 'Prize fulfillment system', 'Prediction analytics'],
              dependencies: ['@tanstack/react-query', 'react-share', 'framer-motion'],
              testing: ['Prediction submission tests', 'Badge system tests', 'Prize tracking tests'],
              sharedComponents: ['PredictionForm', 'BadgeSystem', 'Leaderboard', 'PrizeTracker'],
              userJourney: ['Gamified prediction participation', 'Community competition and rewards']
            }
          },
          {
            id: 'listen-party',
            title: '5.1.3 World\'s Biggest Listen Party',
            purpose: 'Help fans organize a massive, global listening party on official album release date',
            design: 'Community coordination tools with live countdown',
            features: [
              'Global listening party coordination',
              'Live countdown timer to release date',
              'Community organization tools',
              'Event planning and participation features'
            ],
            type: 'feature',
            icon: '🌍',
            color: '#f3e5f5',
            status: 'brainstorming',
            technicalPractices: {
              current: ['Event coordination system', 'Live countdown timers', 'Community management tools'],
              improvements: ['Real-time event synchronization', 'Global timezone handling', 'Event streaming integration', 'Community analytics'],
              dependencies: ['socket.io-client', 'date-fns-tz', 'react-query'],
              testing: ['Event coordination tests', 'Timezone handling tests', 'Real-time synchronization tests'],
              sharedComponents: ['EventCoordinator', 'CountdownTimer', 'CommunityManager', 'EventStream'],
              userJourney: ['Global community event participation', 'Synchronized listening experiences']
            }
          }
        ]
      },
      {
        id: 'eras-tour-reunion',
        title: '5.2 Eras Tour Reunion',
        purpose: 'Features for verified attendees of The Eras Tour to connect and share memories',
        design: 'Authentication system with virtual and in-person meetup tools',
        features: [
          'Authenticate Alumni (Coming Soon)',
          'Virtual Reunion Parties (Brainstorming)',
          'In-Person Meetups (Brainstorming)'
        ],
        type: 'feature',
        icon: '🎪',
        color: '#f3e5f5',
        children: [
          {
            id: 'authenticate-alumni',
            title: '5.2.1 Authenticate Alumni',
            purpose: 'Create trusted community by verifying Eras Tour attendance',
            design: 'Photo verification system for ticket proof',
            features: [
              'Submit proof of attendance (ticket photos)',
              'Photo verification at stadium',
              'Status verification system',
              'Trusted community creation'
            ],
            type: 'feature',
            icon: '✅',
            color: '#e8f5e8',
            status: 'coming-soon',
            technicalPractices: {
              current: ['Photo upload and storage', 'Verification workflow', 'Status tracking system'],
              improvements: ['AI-powered photo verification', 'Blockchain-based verification', 'Privacy-preserving verification', 'Automated verification processing'],
              dependencies: ['@supabase/storage-js', 'react-dropzone', 'sharp'],
              testing: ['Photo upload tests', 'Verification workflow tests', 'Privacy protection tests'],
              sharedComponents: ['PhotoUploader', 'VerificationWorkflow', 'StatusTracker', 'PrivacyShield'],
              userJourney: ['Trusted community verification', 'Exclusive alumni access']
            }
          },
          {
            id: 'virtual-reunion',
            title: '5.2.2 Virtual Reunion Parties',
            purpose: 'Connect people who attended the same specific stadium concert',
            design: 'Private online spaces for stadium-specific groups',
            features: [
              'Private online spaces for stadium groups',
              'Memory sharing and experience exchange',
              'Stadium-specific community building',
              'Virtual event coordination'
            ],
            type: 'feature',
            icon: '💻',
            color: '#e1f5fe',
            status: 'brainstorming',
            technicalPractices: {
              current: ['Private group management', 'Content sharing system', 'Event coordination tools'],
              improvements: ['Real-time video chat integration', 'Memory timeline creation', 'Stadium-specific content curation', 'Virtual event streaming'],
              dependencies: ['socket.io-client', 'agora-rtc-react', 'react-timeline'],
              testing: ['Group management tests', 'Content sharing tests', 'Video chat tests'],
              sharedComponents: ['PrivateGroup', 'MemoryTimeline', 'VideoChat', 'EventStream'],
              userJourney: ['Stadium-specific community building', 'Virtual reunion experiences']
            }
          },
          {
            id: 'in-person-meetups',
            title: '5.2.3 In-Person Meetups',
            purpose: 'Help verified alumni organize real-world meetups',
            design: 'Local meetup creation and promotion tools',
            features: [
              'Create and promote local meetups',
              'Open to all verified tour attendees',
              'Location-based event organization',
              'Real-world community building'
            ],
            type: 'feature',
            icon: '🤝',
            color: '#fff3e0',
            status: 'brainstorming',
            technicalPractices: {
              current: ['Event creation system', 'Location-based services', 'Community promotion tools'],
              improvements: ['Geolocation-based discovery', 'Event recommendation engine', 'Safety verification system', 'Integration with external event platforms'],
              dependencies: ['@tanstack/react-query', 'react-leaflet', 'date-fns'],
              testing: ['Event creation tests', 'Location services tests', 'Safety verification tests'],
              sharedComponents: ['EventCreator', 'LocationMap', 'SafetyVerifier', 'EventPromoter'],
              userJourney: ['Real-world community building', 'Local meetup organization and participation']
            }
          }
        ]
      },
      {
        id: 'travis-era',
        title: '5.3 The Travis Era',
        purpose: 'Community-driven activities related to the ongoing public attention around the relationship',
        design: 'Collaborative brainstorming and celebration features',
        features: [
          'Engagement clowning (Brainstorming)',
          'Wedding clowning (Brainstorming)'
        ],
        type: 'feature',
        icon: '💕',
        color: '#fff3e0',
        children: [
          {
            id: 'engagement-clowning',
            title: '5.3.1 Engagement clowning',
            purpose: 'Community-driven feature for fans to collaboratively decide on creative ways to celebrate the engagement',
            design: 'Collaborative brainstorming and voting system',
            features: [
              'Community-driven celebration ideas',
              'Fan-made video compilation projects',
              'Guess the next public appearance contests',
              'Collaborative digital scrapbook creation'
            ],
            type: 'feature',
            icon: '💍',
            color: '#fce4ec',
            status: 'brainstorming',
            technicalPractices: {
              current: ['Collaborative content creation', 'Voting and polling system', 'Community brainstorming tools'],
              improvements: ['Real-time collaborative editing', 'Video compilation tools', 'Prediction tracking system', 'Digital scrapbook creation'],
              dependencies: ['socket.io-client', 'react-quill', 'framer-motion'],
              testing: ['Collaborative editing tests', 'Voting system tests', 'Content creation tests'],
              sharedComponents: ['CollaborativeEditor', 'VotingSystem', 'VideoCompiler', 'DigitalScrapbook'],
              userJourney: ['Community celebration and creativity', 'Collaborative fan content creation']
            }
          },
          {
            id: 'wedding-clowning',
            title: '5.3.2 Wedding clowning',
            purpose: 'Collaborative space for community to brainstorm and design hypothetical wedding',
            design: 'Community voting and design collaboration tools',
            features: [
              'Collaborative wedding theme brainstorming',
              'Community playlist creation',
              'Wedding cake design voting',
              'Hypothetical wedding planning'
            ],
            type: 'feature',
            icon: '🎂',
            color: '#f3e5f5',
            status: 'brainstorming',
            technicalPractices: {
              current: ['Collaborative design tools', 'Community voting system', 'Playlist creation system'],
              improvements: ['3D design visualization', 'Real-time collaborative planning', 'AI-powered theme suggestions', 'Virtual wedding simulation'],
              dependencies: ['three.js', 'socket.io-client', 'react-query'],
              testing: ['Collaborative design tests', 'Voting system tests', 'Playlist creation tests'],
              sharedComponents: ['DesignCollaborator', 'VotingInterface', 'PlaylistCreator', 'WeddingSimulator'],
              userJourney: ['Collaborative wedding planning', 'Community creativity and celebration']
            }
          }
        ]
      },
      {
        id: 'arcade',
        title: '5.4 Arcade',
        purpose: 'Fun, interactive mini-games and quizzes for fans',
        design: 'Game collection with community-driven content',
        features: [
          'Do You Even Swift, tho?! (Coming Soon)',
          'Community Mini-Games (Brainstorming)'
        ],
        type: 'feature',
        icon: '🎮',
        color: '#e8f5e8',
        children: [
          {
            id: 'swift-quiz',
            title: '5.4.1 Do You Even Swift, tho?!',
            purpose: 'Quiz-style game to test knowledge on song lyrics, music videos, and fun facts',
            design: 'Interactive quiz system with scoring',
            features: [
              'Song lyrics knowledge testing',
              'Music video trivia questions',
              'Artist fun facts quizzes',
              'Scoring and achievement system'
            ],
            type: 'feature',
            icon: '🧠',
            color: '#e1f5fe',
            status: 'coming-soon',
            technicalPractices: {
              current: ['Quiz engine implementation', 'Scoring system', 'Achievement tracking'],
              improvements: ['Adaptive difficulty system', 'Multiplayer quiz modes', 'Leaderboards and competitions', 'Question bank expansion'],
              dependencies: ['@tanstack/react-query', 'framer-motion', 'react-confetti'],
              testing: ['Quiz logic tests', 'Scoring system tests', 'Achievement system tests'],
              sharedComponents: ['QuizEngine', 'ScoringSystem', 'AchievementTracker', 'Leaderboard'],
              userJourney: ['Knowledge testing and gamification', 'Community competition and learning']
            }
          },
          {
            id: 'community-games',
            title: '5.4.2 Community Mini-Games',
            purpose: 'Space for community to design and propose new mini-games',
            design: 'Community-driven game development platform',
            features: [
              'Rhythm-based button matching games',
              'Find the easter egg challenges',
              'Fast-paced trivia games',
              'Community game proposal system'
            ],
            type: 'feature',
            icon: '🎯',
            color: '#fff3e0',
            status: 'brainstorming',
            technicalPractices: {
              current: ['Game engine framework', 'Community proposal system', 'Game hosting platform'],
              improvements: ['Visual game builder', 'Real-time multiplayer support', 'Game analytics and metrics', 'Community voting for game features'],
              dependencies: ['phaser', 'socket.io-client', 'react-query'],
              testing: ['Game engine tests', 'Multiplayer functionality tests', 'Community proposal tests'],
              sharedComponents: ['GameEngine', 'ProposalSystem', 'MultiplayerManager', 'GameAnalytics'],
              userJourney: ['Community game creation and participation', 'User-generated content and entertainment']
            }
          }
        ]
      },
      {
        id: 'mix-mingle',
        title: '5.5 Mix and Mingle',
        purpose: 'Social category to connect fans through community-building activities',
        design: 'Interactive map and social connection tools',
        features: [
          'Interactive Map (Brainstorming)',
          'Eras Tour Alumni Initiative (Brainstorming)'
        ],
        type: 'feature',
        icon: '🗺️',
        color: '#f0f4c3',
        children: [
          {
            id: 'interactive-map',
            title: '5.5.1 Interactive Map',
            purpose: 'Interactive map feature to see and connect with other fans in local area',
            design: 'Location-based fan discovery and meetup tools',
            features: [
              'Local fan discovery on interactive map',
              'Real-world friendship and meetup fostering',
              'Virtual fan cafe with video chat',
              'Local meetup event creation and sharing'
            ],
            type: 'feature',
            icon: '📍',
            color: '#e8f5e8',
            status: 'brainstorming',
            technicalPractices: {
              current: ['Interactive map integration', 'Location-based services', 'Fan discovery system'],
              improvements: ['Privacy-preserving location sharing', 'Real-time fan presence tracking', 'Video chat integration', 'Event recommendation engine'],
              dependencies: ['react-leaflet', 'socket.io-client', 'agora-rtc-react'],
              testing: ['Map functionality tests', 'Location privacy tests', 'Video chat tests'],
              sharedComponents: ['InteractiveMap', 'FanDiscovery', 'VideoChat', 'EventRecommender'],
              userJourney: ['Local fan discovery and connection', 'Real-world community building']
            }
          },
          {
            id: 'alumni-initiative',
            title: '5.5.2 Eras Tour Alumni Initiative',
            purpose: 'Blank canvas for verified Eras Tour alumni to collectively decide on new group activities',
            design: 'Collaborative activity planning for tour alumni',
            features: [
              'Collaborative photo album creation',
              'Private forum for memory sharing',
              'Interactive games based on specific shows',
              'Alumni-specific community activities'
            ],
            type: 'feature',
            icon: '🎪',
            color: '#f3e5f5',
            status: 'brainstorming',
            technicalPractices: {
              current: ['Collaborative content creation', 'Private forum system', 'Activity planning tools'],
              improvements: ['AI-powered activity suggestions', 'Memory timeline creation', 'Show-specific game generation', 'Alumni verification system'],
              dependencies: ['socket.io-client', 'react-quill', 'date-fns'],
              testing: ['Collaborative creation tests', 'Forum functionality tests', 'Activity planning tests'],
              sharedComponents: ['CollaborativeAlbum', 'PrivateForum', 'ActivityPlanner', 'MemoryTimeline'],
              userJourney: ['Alumni community building and memory sharing', 'Exclusive tour attendee experiences']
            }
          }
        ]
      }
    ]
  },
  {
    id: 'implementation',
    title: '6. Implementation Principles',
    purpose: 'To ensure clean, maintainable, and scalable codebase',
    design: 'DRY and KISS principles applied throughout',
    features: [
      'Hierarchy of Tabs: Main Tabs → List of Characteristics → 12-Album Grid → Song List',
      'Reusability: Common components for 12-grid, list items, navigation',
      'Simplicity: Core design simple, additional info revealed on request',
      'Persistence: Bottom navigation bar and FAB persistent across all screens'
    ],
    type: 'page',
    icon: '⚙️',
    color: '#e1f5fe',
    technicalPractices: {
      current: ['Component composition patterns', 'State management architecture', 'Navigation persistence'],
      improvements: ['Design system implementation', 'Performance optimization strategies', 'Code splitting and lazy loading', 'Accessibility standards compliance'],
      dependencies: ['@tanstack/react-query', 'next/dynamic', 'framer-motion'],
      testing: ['Component integration tests', 'Performance benchmarks', 'Accessibility compliance tests', 'Cross-browser compatibility tests'],
      sharedComponents: ['DesignSystem', 'NavigationProvider', 'PerformanceMonitor', 'AccessibilityChecker'],
      userJourney: ['Consistent user experience across all features', 'Scalable and maintainable codebase foundation']
    }
  }
];

// Helper function to get all sections (flattened)
export const getAllSections = (sections: AppSection[] = appSpecification): AppSection[] => {
  const result: AppSection[] = [];
  
  for (const section of sections) {
    result.push(section);
    if (section.children) {
      result.push(...getAllSections(section.children));
    }
  }
  
  return result;
};

// Helper function to get section by ID
export const getSectionById = (id: string, sections: AppSection[] = appSpecification): AppSection | null => {
  for (const section of sections) {
    if (section.id === id) {
      return section;
    }
    if (section.children) {
      const found = getSectionById(id, section.children);
      if (found) return found;
    }
  }
  return null;
};

// Helper function to get main navigation flow
export const getMainFlow = () => {
  return [
    { id: 'homepage', title: 'Homepage', type: 'page' },
    { id: 'add-artist', title: 'Add Your Own Artist', type: 'page' },
    { id: 'artist-page', title: 'Taylor Swift Artist Page (Prediction First)', type: 'page' },
    { id: 'discography', title: 'Discography Page (With Prediction Integration)', type: 'page' }
  ];
};

// Helper function to get tab flows
export const getTabFlows = () => {
  const discography = getSectionById('discography');
  if (!discography?.children) return {};
  
  return {
    explore: discography.children.find(child => child.id === 'explore-tab'),
    rank: discography.children.find(child => child.id === 'rank-tab'),
    connect: discography.children.find(child => child.id === 'connect-tab')
  };
};

// Helper function to get MVP sections only
export const getMvpSections = (sections: AppSection[] = appSpecification): AppSection[] => {
  const result: AppSection[] = [];
  
  for (const section of sections) {
    if (section.mvpIncluded) {
      // Include the section and recursively check children
      const mvpSection = { ...section };
      if (section.children) {
        mvpSection.children = getMvpSections(section.children);
      }
      result.push(mvpSection);
    } else if (section.children) {
      // Even if parent isn't in MVP, check children
      const mvpChildren = getMvpSections(section.children);
      if (mvpChildren.length > 0) {
        const sectionWithMvpChildren = { ...section, children: mvpChildren };
        result.push(sectionWithMvpChildren);
      }
    }
  }
  
  return result;
};
