import React from 'react';

const LocationDisplay = ({ location, levelName, difficulty }) => {
  if (!location) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">
          Location data not available
        </div>
      </div>
    );
  }

  const getLocationIcon = () => {
    if (location.type === 'start') return '🏠';
    if (location.type === 'destination') return '🛡️';
    if (location.id.includes('bridge')) return '🌉';
    if (location.id.includes('hospital')) return '🏥';
    if (location.id.includes('park')) return '🌳';
    if (location.id.includes('street') || location.id.includes('highway')) return '🛣️';
    if (location.id.includes('airport')) return '✈️';
    if (location.id.includes('marina')) return '⚓';
    if (location.id.includes('industrial')) return '🏭';
    if (location.id.includes('university')) return '🎓';
    return '📍';
  };

  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-orange-600 bg-orange-100';
      case 'Expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      {/* Level Header */}
      {levelName && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 pb-4 border-b border-gray-200 gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">{levelName}</h3>
          {difficulty && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor()} text-center sm:text-left`}>
              {difficulty}
            </span>
          )}
        </div>
      )}
      
      {/* Current Location */}
      <div className="text-center">
        <div className="text-3xl sm:text-4xl mb-3">{getLocationIcon()}</div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{location.name}</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">{location.description}</p>
        
        {/* Location Type Indicator */}
        <div className="inline-flex items-center">
          {location.type === 'start' && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              🏁 Starting Point
            </span>
          )}
          {location.type === 'destination' && (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              🎯 Safe Haven
            </span>
          )}
          {location.type === 'intermediate' && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              📍 Checkpoint
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationDisplay;