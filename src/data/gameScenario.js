// Extended game data structure for flood evacuation scenarios with realistic coordinates
export const GAME_SCENARIO = {
  // Using coordinates for a fictional neighborhood in Houston, TX (flood-prone area)
  center: [-95.3698, 29.7604], // Houston center
  locations: [
    { 
      id: 'home', 
      name: 'Home', 
      description: 'Your safe starting point - residential area',
      coordinates: [-95.3800, 29.7500],
      type: 'start'
    },
    { 
      id: 'park', 
      name: 'City Park', 
      description: 'Open area but prone to flooding',
      coordinates: [-95.3750, 29.7520],
      type: 'intermediate'
    },
    { 
      id: 'streetA', 
      name: 'Main Street', 
      description: 'Well-drained main street on higher ground',
      coordinates: [-95.3720, 29.7550],
      type: 'intermediate'
    },
    { 
      id: 'streetB', 
      name: 'River Road', 
      description: 'Low-lying street near the river (FLOODED!)',
      coordinates: [-95.3760, 29.7580],
      type: 'intermediate'
    },
    { 
      id: 'bridge', 
      name: 'Highway Bridge', 
      description: 'Elevated bridge crossing',
      coordinates: [-95.3680, 29.7580],
      type: 'intermediate'
    },
    { 
      id: 'downtown', 
      name: 'Downtown Area', 
      description: 'Urban center with mixed flood risk',
      coordinates: [-95.3650, 29.7600],
      type: 'intermediate'
    },
    { 
      id: 'hospital', 
      name: 'General Hospital', 
      description: 'Medical facility on high ground',
      coordinates: [-95.3620, 29.7620],
      type: 'intermediate'
    },
    { 
      id: 'shelter', 
      name: 'Emergency Shelter', 
      description: 'Safe destination - community center on elevated ground',
      coordinates: [-95.3600, 29.7650],
      type: 'destination'
    }
  ],
  routes: [
    // From Home
    { from: 'home', to: 'park', safe: false, description: 'Through the park (flooded lowland)', floodSeverity: 'high' },
    { from: 'home', to: 'streetA', safe: true, description: 'Take Main Street (higher ground)', floodSeverity: 'none' },
    
    // From Park (if somehow reached)
    { from: 'park', to: 'streetB', safe: false, description: 'Continue to River Road (heavily flooded)', floodSeverity: 'severe' },
    { from: 'park', to: 'streetA', safe: true, description: 'Detour to Main Street', floodSeverity: 'none' },
    
    // From Main Street
    { from: 'streetA', to: 'bridge', safe: true, description: 'Take the highway bridge', floodSeverity: 'none' },
    { from: 'streetA', to: 'downtown', safe: true, description: 'Head through downtown', floodSeverity: 'low' },
    { from: 'streetA', to: 'streetB', safe: false, description: 'Cut through River Road (flooded)', floodSeverity: 'high' },
    
    // From River Road
    { from: 'streetB', to: 'downtown', safe: false, description: 'Continue downtown (flood waters rising)', floodSeverity: 'high' },
    { from: 'streetB', to: 'bridge', safe: false, description: 'Try to reach bridge (road impassable)', floodSeverity: 'severe' },
    
    // From Bridge
    { from: 'bridge', to: 'downtown', safe: true, description: 'Descend to downtown via elevated ramp', floodSeverity: 'low' },
    { from: 'bridge', to: 'hospital', safe: true, description: 'Take elevated route to hospital', floodSeverity: 'none' },
    
    // From Downtown
    { from: 'downtown', to: 'hospital', safe: true, description: 'Head to hospital on higher ground', floodSeverity: 'low' },
    { from: 'downtown', to: 'shelter', safe: true, description: 'Direct route to emergency shelter', floodSeverity: 'low' },
    
    // From Hospital
    { from: 'hospital', to: 'shelter', safe: true, description: 'Final stretch to emergency shelter', floodSeverity: 'none' }
  ],
  
  // Flood zones for map visualization
  floodZones: [
    {
      id: 'park_flood',
      name: 'Park Lowlands',
      coordinates: [
        [-95.3760, 29.7510],
        [-95.3740, 29.7510],
        [-95.3740, 29.7530],
        [-95.3760, 29.7530]
      ],
      severity: 'high',
      color: [255, 100, 100, 180]
    },
    {
      id: 'river_road_flood',
      name: 'River Road Corridor',
      coordinates: [
        [-95.3780, 29.7570],
        [-95.3740, 29.7570],
        [-95.3740, 29.7590],
        [-95.3780, 29.7590]
      ],
      severity: 'severe',
      color: [200, 50, 50, 200]
    },
    {
      id: 'downtown_minor',
      name: 'Downtown Low Areas',
      coordinates: [
        [-95.3670, 29.7590],
        [-95.3630, 29.7590],
        [-95.3630, 29.7610],
        [-95.3670, 29.7610]
      ],
      severity: 'low',
      color: [255, 200, 100, 120]
    }
  ],

  // Map configuration
  mapConfig: {
    initialViewState: {
      longitude: -95.3698,
      latitude: 29.7604,
      zoom: 14,
      pitch: 0,
      bearing: 0
    },
    // Using a free map style that doesn't require API keys
    mapStyle: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
  }
};

export default GAME_SCENARIO;