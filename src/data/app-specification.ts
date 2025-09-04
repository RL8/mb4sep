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
    color: '#e1f5fe'
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
    color: '#e1f5fe'
  },
  {
    id: 'artist-page',
    title: '3. Taylor Swift Artist Page',
    purpose: 'To serve as a dedicated landing page for Taylor Swift',
    design: 'Single-page layout with no scrolling. Back arrow in top-left',
    features: [
      '"Welcome!" greeting',
      'Featured album countdown preview box for "Life of a Showgirl"',
      'Countdown timer (counting down to October 3, 2025, 12:01 a.m. Eastern Time)',
      'Direct shortcut to Showgirl Countdown prediction activity',
      'Clear path to main discography view',
      'Clear path to Connect page'
    ],
    type: 'page',
    icon: '🎤',
    color: '#e1f5fe'
  },
  {
    id: 'discography',
    title: '4. Discography Page (Core Experience)',
    purpose: 'To provide comprehensive and interactive view of artist\'s discography as a research tool',
    design: 'Persistent 12-Grid View with bottom navigation',
    features: [
      'Persistent 12-Grid View: Static grid of 12 albums, always visible',
      'Album tiles: color, name, year, song count (no album art)',
      'Bottom Navigation Bar: "Explore," "Rank," and "Match" tabs',
      '12-album grid representing Taylor Swift\'s complete discography'
    ],
    type: 'page',
    icon: '🎵',
    color: '#f3e5f5',
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
            color: '#e3f2fd'
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
            color: '#f3e5f5'
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
            color: '#e8f5e8'
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
            status: 'active'
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
            status: 'active'
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
            status: 'active'
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
            status: 'active'
          },
          {
            id: 'ranking-musings',
            title: '4.2.5 Ranking Musings',
            purpose: 'Allow users to add personal thoughts and musings about albums and songs',
            design: 'Text input system for personal reflections on music',
            features: [
              'Add musings to individual albums',
              'Add musings to individual songs',
              'Personal reflection text areas',
              'Save musings with rankings',
              'View musings alongside rankings',
              'Edit and update musings over time'
            ],
            type: 'feature',
            icon: '💭',
            color: '#f3e5f5',
            status: 'active'
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
            status: 'active'
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
            status: 'active'
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
            status: 'active'
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
    children: [
      {
        id: 'showgirl-countdown',
        title: '5.1 Showgirl Countdown',
        purpose: 'Activities focused on the upcoming album Life of a Showgirl',
        design: 'Sub-navigation with prediction, guessing, and community activities',
        features: [
          'Prediction Activity (Active)',
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
            purpose: 'Use current music rankings to predict where LOAS will feature on your rankings',
            design: 'Interactive prediction system with accuracy tracking',
            features: [
              'Use current music rankings to predict LOAS placement',
              'Mark predictions as "sounds about right" or "totally way off"',
              'Declare accuracy once album is released',
              'Game state ready for actual results when album releases'
            ],
            type: 'feature',
            icon: '🎯',
            color: '#e8f5e8',
            status: 'active'
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
            status: 'coming-soon'
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
            status: 'brainstorming'
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
            status: 'coming-soon'
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
            status: 'brainstorming'
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
            status: 'brainstorming'
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
            status: 'brainstorming'
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
            status: 'brainstorming'
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
            status: 'coming-soon'
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
            status: 'brainstorming'
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
            status: 'brainstorming'
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
            status: 'brainstorming'
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
    color: '#e1f5fe'
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
    { id: 'artist-page', title: 'Taylor Swift Artist Page', type: 'page' },
    { id: 'discography', title: 'Discography Page', type: 'page' }
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
