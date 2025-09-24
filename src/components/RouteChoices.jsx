import React, { useState, useEffect } from 'react';

const RouteChoices = ({ 
  routes, 
  onRouteSelect, 
  onBacktrack, 
  disabled = false, 
  levelDifficulty = 'Easy', 
  canBacktrack = false, 
  onRoutePreview, 
  onRoutePreviewClear 
}) => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showMobileConfirm, setShowMobileConfirm] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'catastrophic': return '💀';
      case 'severe': return '🚫';
      case 'high': return '⚠️';
      case 'moderate': return '⚡';
      case 'low': return '🟡';
      case 'none': return '✅';
      default: return '❓';
    }
  };

  const getSeverityColor = (safe, severity) => {
    if (disabled) return 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60';
    
    if (safe) {
      if (severity === 'low') return 'border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50';
      if (severity === 'moderate') return 'border-orange-200 hover:border-orange-400 hover:bg-orange-50';
      return 'border-green-200 hover:border-green-400 hover:bg-green-50';
    } else {
      if (severity === 'catastrophic') return 'border-red-600 hover:border-red-700 hover:bg-red-100';
      if (severity === 'severe') return 'border-red-400 hover:border-red-500 hover:bg-red-100';
      return 'border-red-200 hover:border-red-400 hover:bg-red-50';
    }
  };

  const getSeverityLabel = (severity, safe) => {
    if (safe) {
      switch(severity) {
        case 'low': return 'Minor flood risk';
        case 'moderate': return 'Moderate conditions';
        case 'none': return 'Safe route';
        default: return 'Safe passage';
      }
    } else {
      switch(severity) {
        case 'catastrophic': return 'CATASTROPHIC - DEADLY';
        case 'severe': return 'SEVERE FLOOD RISK';
        case 'high': return 'HIGH FLOOD RISK';
        case 'moderate': return 'DANGEROUS CONDITIONS';
        default: return 'FLOOD RISK';
      }
    }
  };

  // Handle route preview on hover (desktop only)
  const handleRouteHover = (route) => {
    if (isDesktop && onRoutePreview && !disabled) {
      onRoutePreview(route);
    }
  };

  const handleRouteHoverEnd = () => {
    if (isDesktop && onRoutePreviewClear && !showMobileConfirm) {
      onRoutePreviewClear();
    }
  };

  // Handle route selection
  const handleRouteClick = (route) => {
    if (disabled) return;
    
    if (isDesktop) {
      // Desktop: Direct selection
      onRouteSelect(route);
    } else {
      // Mobile: Show confirmation with preview
      setSelectedRoute(route);
      setShowMobileConfirm(true);
      if (onRoutePreview) {
        onRoutePreview(route);
      }
    }
  };

  const handleMobileConfirm = () => {
    if (selectedRoute) {
      onRouteSelect(selectedRoute);
    }
    handleMobileCancel();
  };

  const handleMobileCancel = () => {
    setSelectedRoute(null);
    setShowMobileConfirm(false);
    if (onRoutePreviewClear) {
      onRoutePreviewClear();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <h3 className="text-base sm:text-lg font-semibold">Choose your evacuation route:</h3>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          {isDesktop && (
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
              🖱️ Hover to preview route
            </span>
          )}
          {!isDesktop && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              📱 Tap to preview & confirm
            </span>
          )}
          {levelDifficulty && (
            <span className="text-xs sm:text-sm text-gray-500">
              {levelDifficulty} Mode
            </span>
          )}
        </div>
      </div>
      
      {/* Mobile Confirmation Dialog */}
      {showMobileConfirm && selectedRoute && (
        <div className="mb-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-blue-900 flex items-center text-sm">
              <span className="mr-2">🗺️</span>
              Preview Your Route
            </h4>
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
              Check the map above ☝️
            </span>
          </div>
          
          <div className="mb-3 p-3 bg-white rounded border border-blue-200">
            <div className="font-medium text-gray-800 flex items-center text-sm">
              <span className="mr-2">{getSeverityIcon(selectedRoute.floodSeverity)}</span>
              <span>{selectedRoute.description}</span>
            </div>
            <div className={`text-xs mt-2 px-2 py-1 rounded inline-block font-medium ${
              selectedRoute.safe 
                ? selectedRoute.floodSeverity === 'low' 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
                : selectedRoute.floodSeverity === 'catastrophic'
                  ? 'bg-red-200 text-red-900'
                  : 'bg-red-100 text-red-800'
            }`}>
              {getSeverityLabel(selectedRoute.floodSeverity, selectedRoute.safe)}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleMobileConfirm}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
            >
              ✅ Take This Route
            </button>
            <button
              onClick={handleMobileCancel}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors text-sm font-medium flex items-center justify-center"
            >
              ❌ Choose Different
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {routes && routes.length > 0 ? (
          routes.map((route, index) => {
            const severityIcon = getSeverityIcon(route.floodSeverity);
            const colorClass = getSeverityColor(route.safe, route.floodSeverity);
            const severityLabel = getSeverityLabel(route.floodSeverity, route.safe);
            const isSelectedForPreview = selectedRoute === route;
            
            return (
              <button
                key={index}
                onClick={() => handleRouteClick(route)}
                onMouseEnter={() => handleRouteHover(route)}
                onMouseLeave={handleRouteHoverEnd}
                disabled={disabled}
                className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  isSelectedForPreview && showMobileConfirm
                    ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]' 
                    : colorClass
                } ${
                  isDesktop 
                    ? 'hover:shadow-md hover:transform hover:scale-[1.01] hover:border-opacity-80' 
                    : disabled 
                      ? '' 
                      : 'active:transform active:scale-[0.98]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-2">
                    <div className="font-semibold text-gray-800 flex items-center text-sm sm:text-base">
                      <span className="mr-2">{severityIcon}</span>
                      <span className="break-words">{route.description}</span>
                      {isSelectedForPreview && showMobileConfirm && (
                        <span className="ml-2 text-blue-600 animate-pulse">👁️</span>
                      )}
                    </div>
                    
                    {route.floodSeverity && route.floodSeverity !== 'none' && (
                      <div className={`text-xs mt-2 px-2 py-1 rounded inline-block font-medium ${
                        route.safe 
                          ? route.floodSeverity === 'low' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-orange-100 text-orange-800'
                          : route.floodSeverity === 'catastrophic'
                            ? 'bg-red-200 text-red-900'
                            : route.floodSeverity === 'severe'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-orange-100 text-orange-800'
                      }`}>
                        {severityLabel}
                      </div>
                    )}
                  </div>
                  
                  <div className={`text-xl sm:text-2xl ml-2 sm:ml-4 flex items-center ${
                    !route.safe && route.floodSeverity === 'catastrophic' ? 'animate-bounce text-red-600' :
                    !route.safe ? 'animate-pulse text-red-500' : 'text-green-500'
                  }`}>
                    {route.safe ? '✅' : route.floodSeverity === 'catastrophic' ? '💀' : '⚠️'}
                    {!disabled && (
                      <span className="ml-1 text-sm text-gray-500">
                        {isDesktop ? '🖱️' : isSelectedForPreview && showMobileConfirm ? '👁️' : '👆'}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="text-center py-6 sm:py-8 text-gray-500">
            <div className="text-3xl sm:text-4xl mb-4">🚫</div>
            <p className="font-semibold text-sm sm:text-base">No routes available from this location.</p>
            <p className="text-xs sm:text-sm mt-2">You may need to backtrack to find another way.</p>
          </div>
        )}
        
        {/* Backtrack Option - Show when no routes OR as an additional option */}
        {canBacktrack && onBacktrack && (
          <button
            onClick={() => !disabled && onBacktrack()}
            disabled={disabled}
            className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              disabled ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60' : 
              'border-yellow-300 hover:border-yellow-500 hover:bg-yellow-50 bg-yellow-25'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-2">
                <div className="font-semibold text-gray-800 flex items-center text-sm sm:text-base">
                  <span className="mr-2">⬅️</span>
                  <span>Go Back (Backtrack)</span>
                </div>
                <div className="text-xs mt-2 px-2 py-1 rounded inline-block font-medium bg-yellow-100 text-yellow-800">
                  PENALTY: Lose points & time
                </div>
              </div>
              
              <div className="text-xl sm:text-2xl ml-2 sm:ml-4 text-yellow-600">
                ↩️
              </div>
            </div>
          </button>
        )}
      </div>
      
      {(routes && routes.length > 0 || canBacktrack) && levelDifficulty && (
        <div className="mt-4 text-xs text-gray-600 text-center">
          💡 Tip: In {levelDifficulty} mode, choose carefully - penalties are {
            levelDifficulty === 'Expert' ? 'severe' : 
            levelDifficulty === 'Hard' ? 'high' : 
            levelDifficulty === 'Medium' ? 'moderate' : 'low'
          }! {canBacktrack && "Use backtrack as a last resort - it comes with penalties."}
        </div>
      )}
    </div>
  );
};

export default RouteChoices;