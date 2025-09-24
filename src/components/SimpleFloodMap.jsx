import React from 'react';
import { GAME_SCENARIO } from '../data';

const SimpleFloodMap = ({ currentLocation, availableRoutes, path, levelName, previewRoute }) => {
  const { locations } = GAME_SCENARIO;
  
  // Debug logging to help identify issues
  console.log('SimpleFloodMap render:', {
    currentLocation,
    availableRoutesCount: availableRoutes?.length || 0,
    availableRoutes,
    pathLength: path?.length || 0,
    previewRoute
  });
  
  // Get location style based on current state
  const getLocationStyle = (locationId) => {
    if (locationId === currentLocation) {
      return 'current-location';
    }
    if (path.includes(locationId)) {
      return 'visited-location';
    }
    const location = locations.find(loc => loc.id === locationId);
    if (location?.type === 'destination') {
      return 'destination-location';
    }
    return 'unvisited-location';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-bold flex items-center">
          🗺️ Houston Metro Evacuation Map
        </h3>
        <p className="text-xs sm:text-sm text-blue-100 mt-1">
          Emergency Flood Zone - Navigate to Safety
        </p>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 p-2 sm:p-4" style={{ minHeight: '400px', maxHeight: '500px' }}>
        {/* Background Terrain */}
        <div className="absolute inset-2 sm:inset-4 rounded-lg bg-gradient-to-br from-green-200 via-green-100 to-blue-100 shadow-inner">
          
          {/* Major Geographic Features */}
          {/* Buffalo Bayou River */}
          <div className="absolute top-[15%] left-0 right-0 h-[8%] bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 rounded-full opacity-70 shadow-lg">
            <div className="flex items-center justify-center h-full">
              <span className="text-xs sm:text-sm text-blue-800 font-bold bg-white bg-opacity-70 px-2 py-1 rounded">
                🌊 Buffalo Bayou
              </span>
            </div>
          </div>
          
          {/* Major Roads */}
          <div className="absolute top-[30%] left-0 right-0 h-[2%] bg-gray-400 opacity-50 shadow-sm"></div>
          <div className="absolute top-[55%] left-0 right-0 h-[2%] bg-gray-400 opacity-50 shadow-sm"></div>
          <div className="absolute top-[75%] left-0 right-0 h-[2%] bg-gray-400 opacity-50 shadow-sm"></div>
          
          {/* Highway */}
          <div className="absolute top-[40%] left-[20%] right-[10%] h-[3%] bg-gray-600 opacity-60 rounded shadow-md">
            <div className="flex items-center justify-center h-full">
              <span className="text-xs text-white font-bold hidden sm:block">I-45</span>
            </div>
          </div>

          {/* Flood Zones - Smaller and Better Spaced */}
          {/* Severe Flood Zone - Park Area */}
          <div className="absolute top-[52%] left-[10%] w-[18%] h-[22%] bg-gradient-to-br from-red-400 via-red-300 to-red-200 rounded-xl opacity-75 shadow-md border border-red-400">
            <div className="absolute inset-0 bg-red-500 opacity-15 rounded-xl"></div>
            <div className="relative p-1 text-center">
              <div className="text-xs text-red-800 font-bold">⚠️ SEVERE</div>
              <div className="text-xs text-red-700 font-semibold hidden sm:block">Park Flood</div>
            </div>
          </div>
          
          {/* Critical Flood Zone - River Overflow */}
          <div className="absolute top-[10%] right-[18%] w-[22%] h-[18%] bg-gradient-to-br from-red-600 via-red-500 to-red-400 rounded-xl opacity-80 shadow-lg border border-red-500">
            <div className="absolute inset-0 bg-red-600 opacity-25 rounded-xl"></div>
            <div className="relative p-1 text-center">
              <div className="text-xs text-red-900 font-bold">💀 CRITICAL</div>
              <div className="text-xs text-red-800 font-semibold hidden sm:block">River Flood</div>
            </div>
          </div>
          
          {/* Moderate Flood Zone - Downtown */}
          <div className="absolute bottom-[22%] left-[48%] w-[25%] h-[15%] bg-gradient-to-br from-orange-300 via-yellow-300 to-orange-200 rounded-xl opacity-65 shadow-md border border-orange-300">
            <div className="absolute inset-0 bg-orange-400 opacity-15 rounded-xl"></div>
            <div className="relative p-1 text-center">
              <div className="text-xs text-orange-800 font-bold">⚡ MODERATE</div>
              <div className="text-xs text-orange-700 font-semibold hidden sm:block">Street Flood</div>
            </div>
          </div>
          
          {/* Minor Flood Zone */}
          <div className="absolute top-[68%] right-[22%] w-[15%] h-[12%] bg-gradient-to-br from-yellow-200 via-yellow-100 to-green-100 rounded-lg opacity-55 shadow border border-yellow-300">
            <div className="relative p-1 text-center">
              <div className="text-xs text-yellow-700 font-bold">🟡 MINOR</div>
              <div className="text-xs text-yellow-600 font-semibold hidden sm:block">Drainage</div>
            </div>
          </div>

          {/* Safe Zones */}
          <div className="absolute top-[6%] right-[6%] w-[12%] h-[10%] bg-gradient-to-br from-green-300 to-green-200 rounded-lg opacity-65 shadow-md border border-green-400">
            <div className="relative p-1 text-center">
              <div className="text-xs text-green-800 font-bold">✅ SAFE</div>
              <div className="text-xs text-green-700 font-semibold hidden sm:block">Shelter</div>
            </div>
          </div>

          {/* Location Markers - Smaller and Better Spaced */}
          {locations.map((location, index) => {
            const positions = {
              'home': { top: '88%', left: '15%' },
              'park': { top: '68%', left: '32%' },
              'streetA': { top: '48%', left: '45%' },
              'streetB': { top: '32%', left: '72%' },
              'bridge': { top: '22%', left: '60%' },
              'downtown': { top: '75%', left: '78%' },
              'hospital': { top: '40%', left: '88%' },
              'shelter': { top: '10%', left: '85%' }
            };

            const position = positions[location.id] || { top: `${index * 12 + 20}%`, left: `${index * 10 + 15}%` };
            
            return (
              <div
                key={location.id}
                className="absolute flex flex-col items-center transition-all duration-300 transform hover:scale-110"
                style={position}
              >
                {/* Location Marker */}
                <div className={`
                  w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border-2 shadow-md flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300
                  ${location.id === currentLocation 
                    ? 'bg-blue-500 text-white border-blue-600 animate-bounce shadow-blue-400' 
                    : path.includes(location.id)
                    ? 'bg-green-500 text-white border-green-600 shadow-green-400'
                    : location.type === 'destination'
                    ? 'bg-purple-500 text-white border-purple-600 shadow-purple-400'
                    : 'bg-white text-gray-700 border-gray-400 shadow-gray-300'
                  }
                `}>
                  {location.id === currentLocation ? '👤' : 
                   location.type === 'destination' ? '🏠' :
                   location.type === 'start' ? '🚪' : 
                   path.includes(location.id) ? '✅' : '📍'}
                </div>
                
                {/* Location Label */}
                <div className={`
                  mt-1 px-1 py-0.5 rounded text-xs font-semibold shadow-sm text-center max-w-16 truncate transition-all duration-300
                  ${location.id === currentLocation 
                    ? 'bg-blue-500 text-white' 
                    : path.includes(location.id)
                    ? 'bg-green-500 text-white'
                    : location.type === 'destination'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-gray-800 border border-gray-300'
                  }
                `}>
                  {location.name.length > 8 ? location.name.substring(0, 8) : location.name}
                  {location.type === 'destination' && <div className="text-xs">🛡️</div>}
                </div>
              </div>
            );
          })}

          {/* Enhanced Route Visualization - Available Routes */}
          {availableRoutes && Array.isArray(availableRoutes) && availableRoutes.length > 0 ? (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                {/* Smaller, properly sized arrows */}
                <marker id="arrowhead-safe" markerWidth="6" markerHeight="4" 
                  refX="5" refY="2" orient="auto" markerUnits="strokeWidth">
                  <polygon points="0 0, 6 2, 0 4" fill="#10b981" />
                </marker>
                <marker id="arrowhead-danger" markerWidth="6" markerHeight="4" 
                  refX="5" refY="2" orient="auto" markerUnits="strokeWidth">
                  <polygon points="0 0, 6 2, 0 4" fill="#ef4444" />
                </marker>
                <marker id="arrowhead-preview" markerWidth="8" markerHeight="5" 
                  refX="7" refY="2.5" orient="auto" markerUnits="strokeWidth">
                  <polygon points="0 0, 8 2.5, 0 5" fill="#3b82f6" stroke="white" strokeWidth="0.5" />
                </marker>
                
                {/* Path gradients for better trails */}
                <linearGradient id="safe-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="danger-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="preview-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                </linearGradient>
                
                {/* Glow effects */}
                <filter id="route-glow">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="preview-glow">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {console.log('Rendering routes:', availableRoutes) || availableRoutes.map((route, index) => {
                console.log(`Route ${index}:`, route);
                
                const positions = {
                  'home': { x: 15, y: 88 },
                  'park': { x: 32, y: 68 },
                  'streetA': { x: 45, y: 48 },
                  'streetB': { x: 72, y: 32 },
                  'bridge': { x: 60, y: 22 },
                  'downtown': { x: 78, y: 75 },
                  'hospital': { x: 88, y: 40 },
                  'shelter': { x: 85, y: 10 }
                };
                
                const fromPos = positions[route.from];
                const toPos = positions[route.to];
                
                console.log(`Route ${index} positions:`, { from: route.from, to: route.to, fromPos, toPos });
                
                if (!fromPos || !toPos) {
                  console.warn(`Missing position for route ${index}:`, route);
                  return null;
                }
                
                // Calculate path with slight curve for better visualization
                const dx = toPos.x - fromPos.x;
                const dy = toPos.y - fromPos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const curveOffset = distance * 0.15; // Slight curve for natural paths
                
                const midX = (fromPos.x + toPos.x) / 2 + (dy / distance) * curveOffset;
                const midY = (fromPos.y + toPos.y) / 2 - (dx / distance) * curveOffset;
                
                // Check if this route is being previewed
                const isPreviewRoute = previewRoute && 
                  previewRoute.from === route.from && 
                  previewRoute.to === route.to;
                
                // Get route styling
                const getRouteStyle = (safe, severity, isPreview) => {
                  if (isPreview) {
                    return {
                      stroke: 'url(#preview-gradient)',
                      strokeWidth: '3',
                      strokeDasharray: '0',
                      opacity: '1',
                      filter: 'url(#preview-glow)',
                      markerEnd: 'url(#arrowhead-preview)'
                    };
                  }
                  
                  if (safe) {
                    return {
                      stroke: severity === 'low' ? '#f59e0b' : 'url(#safe-gradient)',
                      strokeWidth: '2.5',
                      strokeDasharray: '0',
                      opacity: '0.8',
                      filter: 'url(#route-glow)',
                      markerEnd: 'url(#arrowhead-safe)'
                    };
                  } else {
                    return {
                      stroke: 'url(#danger-gradient)',
                      strokeWidth: '2.5',
                      strokeDasharray: severity === 'severe' ? '6,3' : '4,2',
                      opacity: '0.8',
                      filter: 'url(#route-glow)',
                      markerEnd: 'url(#arrowhead-danger)'
                    };
                  }
                };
                
                const pathStyle = getRouteStyle(route.safe, route.floodSeverity, isPreviewRoute);
                
                // Create curved path using quadratic bezier
                const pathData = `M ${fromPos.x} ${fromPos.y} Q ${midX} ${midY} ${toPos.x} ${toPos.y}`;
                
                return (
                  <g key={index}>
                    {/* Background trail for better visibility */}
                    <path
                      d={pathData}
                      stroke="white"
                      strokeWidth={parseFloat(pathStyle.strokeWidth) + 1}
                      fill="none"
                      opacity="0.6"
                    />
                    
                    {/* Main route path */}
                    <path
                      d={pathData}
                      stroke={pathStyle.stroke}
                      strokeWidth={pathStyle.strokeWidth}
                      strokeDasharray={pathStyle.strokeDasharray}
                      fill="none"
                      opacity={pathStyle.opacity}
                      filter={pathStyle.filter}
                      markerEnd={pathStyle.markerEnd}
                      className={isPreviewRoute ? 'animate-pulse' : ''}
                    />
                    
                    {/* Route status indicator */}
                    <circle
                      cx={midX}
                      cy={midY}
                      r={isPreviewRoute ? "2.5" : "2"}
                      fill={isPreviewRoute ? "#3b82f6" : route.safe ? "#10b981" : "#ef4444"}
                      stroke="white"
                      strokeWidth="1"
                      opacity="0.9"
                      className={isPreviewRoute ? 'animate-pulse' : ''}
                    />
                    
                    {/* Route status icon */}
                    <text
                      x={midX}
                      y={midY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="2"
                      fontWeight="bold"
                    >
                      {isPreviewRoute ? '➡' : route.safe ? '✓' : route.floodSeverity === 'severe' ? '!' : 'X'}
                    </text>
                    
                    {/* Enhanced description for preview route */}
                    {isPreviewRoute && (
                      <g>
                        <rect
                          x={midX - 8}
                          y={midY + 4}
                          width="16"
                          height="4"
                          fill="#3b82f6"
                          fillOpacity="0.9"
                          stroke="white"
                          strokeWidth="0.5"
                          rx="1"
                          className="animate-pulse"
                        />
                        <text
                          x={midX}
                          y={midY + 6}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="white"
                          fontSize="1.5"
                          fontWeight="bold"
                        >
                          👁️ {route.description.length > 15 ? route.description.substring(0, 12) + '...' : route.description}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          ) : (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded text-sm">
                {availableRoutes ? 
                  `No routes available from ${currentLocation || 'current location'}` :
                  'Loading routes...'
                }
              </div>
            </div>
          )}

          {/* Path History - Enhanced with Better Trails */}
          {path && Array.isArray(path) && path.length > 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <filter id="path-glow">
                  <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              
              {console.log('Rendering path history:', path) || path.slice(0, -1).map((locationId, index) => {
                const fromId = locationId;
                const toId = path[index + 1];
                
                const positions = {
                  'home': { x: 15, y: 88 },
                  'park': { x: 32, y: 68 },
                  'streetA': { x: 45, y: 48 },
                  'streetB': { x: 72, y: 32 },
                  'bridge': { x: 60, y: 22 },
                  'downtown': { x: 78, y: 75 },
                  'hospital': { x: 88, y: 40 },
                  'shelter': { x: 85, y: 10 }
                };
                
                const fromPos = positions[fromId];
                const toPos = positions[toId];
                
                if (!fromPos || !toPos) return null;
                
                // Calculate curved path for history
                const dx = toPos.x - fromPos.x;
                const dy = toPos.y - fromPos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const curveOffset = distance * 0.1;
                
                const midX = (fromPos.x + toPos.x) / 2 + (dy / distance) * curveOffset;
                const midY = (fromPos.y + toPos.y) / 2 - (dx / distance) * curveOffset;
                
                const pathData = `M ${fromPos.x} ${fromPos.y} Q ${midX} ${midY} ${toPos.x} ${toPos.y}`;
                
                return (
                  <g key={`path-${index}`}>
                    {/* Background trail */}
                    <path
                      d={pathData}
                      stroke="white"
                      strokeWidth="4"
                      fill="none"
                      opacity="0.7"
                    />
                    
                    {/* Main path trail */}
                    <path
                      d={pathData}
                      stroke="url(#path-gradient)"
                      strokeWidth="3"
                      strokeDasharray="6,3"
                      fill="none"
                      opacity="0.9"
                      filter="url(#path-glow)"
                    />
                    
                    {/* Path segment indicator */}
                    <circle
                      cx={midX}
                      cy={midY}
                      r="1.5"
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="0.5"
                      opacity="0.9"
                    />
                    
                    {/* Step number */}
                    <text
                      x={midX}
                      y={midY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="1.5"
                      fontWeight="bold"
                    >
                      {index + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* Compact Legend */}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm p-1.5 sm:p-2 rounded shadow-md border border-gray-200 text-xs max-w-32">
          <h5 className="font-bold text-gray-800 mb-1 text-center text-xs">Risk Levels</h5>
          <div className="space-y-0.5">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-300 rounded mr-1"></div>
              <span className="text-xs">✅ Safe</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-300 rounded mr-1"></div>
              <span className="text-xs">🟡 Minor</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-300 rounded mr-1"></div>
              <span className="text-xs">⚡ Moderate</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded mr-1"></div>
              <span className="text-xs">⚠️ Severe</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-600 rounded mr-1"></div>
              <span className="text-xs">💀 Critical</span>
            </div>
          </div>
        </div>

        {/* Current Status Indicator */}
        {currentLocation && (
          <div className="absolute bottom-2 left-2 bg-blue-600 text-white p-1.5 sm:p-2 rounded shadow-md max-w-28">
            <div className="text-xs font-bold">📍 Location</div>
            <div className="text-xs truncate">
              {(locations.find(loc => loc.id === currentLocation)?.name || 'Unknown').substring(0, 12)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleFloodMap;