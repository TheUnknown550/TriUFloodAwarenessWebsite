// Multi-level flood evacuation game scenarios with progressive difficulty

export const GAME_LEVELS = {
  1: {
    name: "Beginner - Neighborhood Evacuation",
    description: "Learn the basics of flood evacuation in a small neighborhood",
    difficulty: "Easy",
    timeLimit: null, // No time pressure
    maxMistakes: 3,
    bonusMultiplier: 1.0,
    scenario: {
      center: [-95.3698, 29.7604],
      locations: [
        { 
          id: 'home', 
          name: 'Your House', 
          description: 'Safe starting point',
          coordinates: [-95.3800, 29.7500],
          type: 'start'
        },
        { 
          id: 'street1', 
          name: 'Oak Street', 
          description: 'Main residential street',
          coordinates: [-95.3750, 29.7520],
          type: 'intermediate'
        },
        { 
          id: 'street2', 
          name: 'Pine Avenue', 
          description: 'Higher ground route',
          coordinates: [-95.3700, 29.7540],
          type: 'intermediate'
        },
        { 
          id: 'shelter', 
          name: 'Community Center', 
          description: 'Local emergency shelter',
          coordinates: [-95.3650, 29.7560],
          type: 'destination'
        }
      ],
      routes: [
        { from: 'home', to: 'street1', safe: true, description: 'Walk down Oak Street', floodSeverity: 'none' },
        { from: 'home', to: 'street2', safe: true, description: 'Take Pine Avenue (longer but safer)', floodSeverity: 'none' },
        { from: 'street1', to: 'shelter', safe: false, description: 'Direct route through flooded area', floodSeverity: 'moderate' },
        { from: 'street1', to: 'street2', safe: true, description: 'Detour to higher ground', floodSeverity: 'none' },
        { from: 'street2', to: 'shelter', safe: true, description: 'Safe route to shelter', floodSeverity: 'none' }
      ],
      floodZones: [
        {
          id: 'low_area',
          name: 'Low-lying Area',
          coordinates: [
            [-95.3680, 29.7550],
            [-95.3620, 29.7550],
            [-95.3620, 29.7570],
            [-95.3680, 29.7570]
          ],
          severity: 'moderate',
          color: [255, 150, 100, 140]
        }
      ]
    }
  },

  2: {
    name: "Intermediate - City District",
    description: "Navigate through a larger urban area with multiple hazards",
    difficulty: "Medium",
    timeLimit: 180, // 3 minutes
    maxMistakes: 2,
    bonusMultiplier: 1.5,
    scenario: {
      center: [-95.3698, 29.7604],
      locations: [
        { 
          id: 'home', 
          name: 'Apartment Complex', 
          description: 'Multi-story residential building',
          coordinates: [-95.3800, 29.7500],
          type: 'start'
        },
        { 
          id: 'park', 
          name: 'Riverside Park', 
          description: 'Low-lying recreational area - FLOOD RISK!',
          coordinates: [-95.3750, 29.7520],
          type: 'intermediate'
        },
        { 
          id: 'mainst', 
          name: 'Main Street', 
          description: 'Commercial district on elevated ground',
          coordinates: [-95.3720, 29.7550],
          type: 'intermediate'
        },
        { 
          id: 'bridge', 
          name: 'Central Bridge', 
          description: 'River crossing point',
          coordinates: [-95.3680, 29.7580],
          type: 'intermediate'
        },
        { 
          id: 'hospital', 
          name: 'City Hospital', 
          description: 'Medical facility with emergency services',
          coordinates: [-95.3640, 29.7600],
          type: 'intermediate'
        },
        { 
          id: 'shelter', 
          name: 'Emergency Shelter', 
          description: 'Designated evacuation center',
          coordinates: [-95.3600, 29.7620],
          type: 'destination'
        }
      ],
      routes: [
        { from: 'home', to: 'park', safe: false, description: 'Through the park (flooding expected)', floodSeverity: 'high' },
        { from: 'home', to: 'mainst', safe: true, description: 'Via Main Street (safer route)', floodSeverity: 'low' },
        { from: 'park', to: 'bridge', safe: false, description: 'Attempt bridge crossing (dangerous)', floodSeverity: 'severe' },
        { from: 'park', to: 'mainst', safe: true, description: 'Evacuate to Main Street', floodSeverity: 'moderate' },
        { from: 'mainst', to: 'bridge', safe: true, description: 'Cross bridge safely', floodSeverity: 'none' },
        { from: 'mainst', to: 'hospital', safe: true, description: 'Head to hospital', floodSeverity: 'low' },
        { from: 'bridge', to: 'hospital', safe: true, description: 'Continue to hospital', floodSeverity: 'none' },
        { from: 'hospital', to: 'shelter', safe: true, description: 'Final destination', floodSeverity: 'none' }
      ],
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
          color: [255, 100, 100, 160]
        },
        {
          id: 'commercial_minor',
          name: 'Commercial District',
          coordinates: [
            [-95.3730, 29.7540],
            [-95.3710, 29.7540],
            [-95.3710, 29.7560],
            [-95.3730, 29.7560]
          ],
          severity: 'low',
          color: [255, 200, 100, 100]
        }
      ]
    }
  },

  3: {
    name: "Advanced - Metropolitan Area",
    description: "Complex urban evacuation with multiple route choices and time pressure",
    difficulty: "Hard",
    timeLimit: 150, // 2.5 minutes
    maxMistakes: 1,
    bonusMultiplier: 2.0,
    scenario: {
      center: [-95.3698, 29.7604],
      locations: [
        { 
          id: 'home', 
          name: 'Downtown Residence', 
          description: 'High-rise in flood zone',
          coordinates: [-95.3800, 29.7500],
          type: 'start'
        },
        { 
          id: 'subway', 
          name: 'Metro Station', 
          description: 'Underground transport (FLOODED!)',
          coordinates: [-95.3770, 29.7515],
          type: 'intermediate'
        },
        { 
          id: 'park', 
          name: 'Central Park', 
          description: 'Large green space - major flood risk',
          coordinates: [-95.3750, 29.7530],
          type: 'intermediate'
        },
        { 
          id: 'highway', 
          name: 'Interstate Overpass', 
          description: 'Elevated highway route',
          coordinates: [-95.3720, 29.7550],
          type: 'intermediate'
        },
        { 
          id: 'industrial', 
          name: 'Industrial District', 
          description: 'Factory area with contamination risk',
          coordinates: [-95.3690, 29.7570],
          type: 'intermediate'
        },
        { 
          id: 'bridge', 
          name: 'Main Bridge', 
          description: 'Primary river crossing',
          coordinates: [-95.3680, 29.7580],
          type: 'intermediate'
        },
        { 
          id: 'hospital', 
          name: 'Regional Hospital', 
          description: 'Major medical center',
          coordinates: [-95.3640, 29.7600],
          type: 'intermediate'
        },
        { 
          id: 'university', 
          name: 'University Campus', 
          description: 'Large campus with multiple buildings',
          coordinates: [-95.3620, 29.7620],
          type: 'intermediate'
        },
        { 
          id: 'shelter', 
          name: 'Regional Emergency Center', 
          description: 'Main evacuation facility',
          coordinates: [-95.3600, 29.7640],
          type: 'destination'
        }
      ],
      routes: [
        // From home - multiple dangerous options
        { from: 'home', to: 'subway', safe: false, description: 'Metro station (completely flooded)', floodSeverity: 'severe' },
        { from: 'home', to: 'park', safe: false, description: 'Through Central Park (major flooding)', floodSeverity: 'high' },
        { from: 'home', to: 'highway', safe: true, description: 'Climb to highway overpass', floodSeverity: 'none' },
        
        // From subway (if survived)
        { from: 'subway', to: 'park', safe: false, description: 'Surface through park (still dangerous)', floodSeverity: 'high' },
        { from: 'subway', to: 'highway', safe: false, description: 'Emergency exit to highway (risky)', floodSeverity: 'moderate' },
        
        // From park
        { from: 'park', to: 'highway', safe: true, description: 'Evacuate to higher ground', floodSeverity: 'low' },
        { from: 'park', to: 'industrial', safe: false, description: 'Industrial shortcut (contaminated water)', floodSeverity: 'severe' },
        
        // From highway - safest routes
        { from: 'highway', to: 'bridge', safe: true, description: 'Highway to bridge connector', floodSeverity: 'none' },
        { from: 'highway', to: 'industrial', safe: true, description: 'Overpass to industrial area', floodSeverity: 'low' },
        
        // From industrial
        { from: 'industrial', to: 'bridge', safe: true, description: 'Industrial access road to bridge', floodSeverity: 'low' },
        { from: 'industrial', to: 'hospital', safe: true, description: 'Direct route to hospital', floodSeverity: 'moderate' },
        
        // From bridge
        { from: 'bridge', to: 'hospital', safe: true, description: 'Bridge to medical district', floodSeverity: 'none' },
        { from: 'bridge', to: 'university', safe: true, description: 'Academic district route', floodSeverity: 'low' },
        
        // From hospital
        { from: 'hospital', to: 'university', safe: true, description: 'Medical to academic campus', floodSeverity: 'none' },
        { from: 'hospital', to: 'shelter', safe: true, description: 'Direct to emergency center', floodSeverity: 'none' },
        
        // From university
        { from: 'university', to: 'shelter', safe: true, description: 'Campus to regional center', floodSeverity: 'none' }
      ],
      floodZones: [
        {
          id: 'downtown_severe',
          name: 'Downtown Core',
          coordinates: [
            [-95.3790, 29.7490],
            [-95.3760, 29.7490],
            [-95.3760, 29.7520],
            [-95.3790, 29.7520]
          ],
          severity: 'severe',
          color: [200, 50, 50, 200]
        },
        {
          id: 'park_major',
          name: 'Central Park Basin',
          coordinates: [
            [-95.3760, 29.7520],
            [-95.3740, 29.7520],
            [-95.3740, 29.7540],
            [-95.3760, 29.7540]
          ],
          severity: 'high',
          color: [255, 100, 100, 180]
        },
        {
          id: 'industrial_contaminated',
          name: 'Industrial Contamination Zone',
          coordinates: [
            [-95.3700, 29.7560],
            [-95.3680, 29.7560],
            [-95.3680, 29.7580],
            [-95.3700, 29.7580]
          ],
          severity: 'severe',
          color: [150, 50, 150, 200]
        }
      ]
    }
  },

  4: {
    name: "Expert - Hurricane Evacuation",
    description: "Major disaster scenario with extreme conditions and limited safe routes",
    difficulty: "Expert",
    timeLimit: 120, // 2 minutes
    maxMistakes: 0, // No mistakes allowed!
    bonusMultiplier: 3.0,
    scenario: {
      center: [-95.3698, 29.7604],
      locations: [
        { 
          id: 'home', 
          name: 'Coastal Residence', 
          description: 'Beachfront property in evacuation zone',
          coordinates: [-95.3850, 29.7450],
          type: 'start'
        },
        { 
          id: 'marina', 
          name: 'Harbor Marina', 
          description: 'Boat launch - storm surge incoming!',
          coordinates: [-95.3820, 29.7470],
          type: 'intermediate'
        },
        { 
          id: 'lowland', 
          name: 'Coastal Lowlands', 
          description: 'Marshy area - extremely dangerous',
          coordinates: [-95.3800, 29.7490],
          type: 'intermediate'
        },
        { 
          id: 'evacroute', 
          name: 'Evacuation Highway', 
          description: 'Official hurricane evacuation route',
          coordinates: [-95.3750, 29.7520],
          type: 'intermediate'
        },
        { 
          id: 'oldtown', 
          name: 'Historic District', 
          description: 'Old buildings on slightly higher ground',
          coordinates: [-95.3720, 29.7540],
          type: 'intermediate'
        },
        { 
          id: 'reservoir', 
          name: 'Water Treatment Plant', 
          description: 'Critical infrastructure - may fail',
          coordinates: [-95.3690, 29.7560],
          type: 'intermediate'
        },
        { 
          id: 'interstate', 
          name: 'Interstate Junction', 
          description: 'Major highway intersection',
          coordinates: [-95.3660, 29.7580],
          type: 'intermediate'
        },
        { 
          id: 'hills', 
          name: 'Highland District', 
          description: 'High elevation residential area',
          coordinates: [-95.3630, 29.7600],
          type: 'intermediate'
        },
        { 
          id: 'airport', 
          name: 'Regional Airport', 
          description: 'Emergency aviation hub',
          coordinates: [-95.3600, 29.7620],
          type: 'intermediate'
        },
        { 
          id: 'shelter', 
          name: 'Mega Shelter Complex', 
          description: 'Reinforced emergency facility for thousands',
          coordinates: [-95.3570, 29.7650],
          type: 'destination'
        }
      ],
      routes: [
        // From coastal home - all routes initially dangerous
        { from: 'home', to: 'marina', safe: false, description: 'Head to marina (storm surge zone!)', floodSeverity: 'catastrophic' },
        { from: 'home', to: 'lowland', safe: false, description: 'Cross lowlands (extremely dangerous)', floodSeverity: 'severe' },
        { from: 'home', to: 'evacroute', safe: true, description: 'Official evacuation route (congested)', floodSeverity: 'moderate' },
        
        // From marina - mostly deadly
        { from: 'marina', to: 'lowland', safe: false, description: 'Inland through marshes (fatal)', floodSeverity: 'catastrophic' },
        { from: 'marina', to: 'evacroute', safe: false, description: 'Emergency access road (washed out)', floodSeverity: 'severe' },
        
        // From lowlands - very limited options
        { from: 'lowland', to: 'evacroute', safe: false, description: 'Try to reach highway (too late)', floodSeverity: 'severe' },
        { from: 'lowland', to: 'oldtown', safe: false, description: 'Historic district (also flooding)', floodSeverity: 'high' },
        
        // From evacuation route - main path
        { from: 'evacroute', to: 'oldtown', safe: true, description: 'Alternative through historic area', floodSeverity: 'low' },
        { from: 'evacroute', to: 'interstate', safe: true, description: 'Direct to interstate (best option)', floodSeverity: 'none' },
        { from: 'evacroute', to: 'reservoir', safe: false, description: 'Shortcut by treatment plant (risky)', floodSeverity: 'high' },
        
        // From old town
        { from: 'oldtown', to: 'reservoir', safe: true, description: 'Route by water plant', floodSeverity: 'moderate' },
        { from: 'oldtown', to: 'interstate', safe: true, description: 'Connect to interstate', floodSeverity: 'low' },
        
        // From reservoir - infrastructure failure risk
        { from: 'reservoir', to: 'interstate', safe: false, description: 'Plant failure zone (avoid!)', floodSeverity: 'severe' },
        { from: 'reservoir', to: 'hills', safe: true, description: 'Emergency route to highlands', floodSeverity: 'moderate' },
        
        // From interstate - good options
        { from: 'interstate', to: 'hills', safe: true, description: 'Exit to highland district', floodSeverity: 'none' },
        { from: 'interstate', to: 'airport', safe: true, description: 'Continue to airport', floodSeverity: 'low' },
        
        // From hills - safe zone
        { from: 'hills', to: 'airport', safe: true, description: 'Highland to airport route', floodSeverity: 'none' },
        { from: 'hills', to: 'shelter', safe: true, description: 'Direct to mega shelter', floodSeverity: 'none' },
        
        // From airport - final stretch
        { from: 'airport', to: 'shelter', safe: true, description: 'Airport to shelter complex', floodSeverity: 'none' }
      ],
      floodZones: [
        {
          id: 'coastal_catastrophic',
          name: 'Storm Surge Zone',
          coordinates: [
            [-95.3870, 29.7440],
            [-95.3800, 29.7440],
            [-95.3800, 29.7480],
            [-95.3870, 29.7480]
          ],
          severity: 'catastrophic',
          color: [139, 0, 0, 250] // Dark red
        },
        {
          id: 'lowland_severe',
          name: 'Coastal Lowlands',
          coordinates: [
            [-95.3820, 29.7480],
            [-95.3780, 29.7480],
            [-95.3780, 29.7500],
            [-95.3820, 29.7500]
          ],
          severity: 'severe',
          color: [200, 50, 50, 220]
        },
        {
          id: 'reservoir_failure',
          name: 'Infrastructure Failure Zone',
          coordinates: [
            [-95.3700, 29.7550],
            [-95.3680, 29.7550],
            [-95.3680, 29.7570],
            [-95.3700, 29.7570]
          ],
          severity: 'severe',
          color: [100, 50, 200, 200] // Purple for infrastructure
        }
      ]
    }
  }
};

export default GAME_LEVELS;