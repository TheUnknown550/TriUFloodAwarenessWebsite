import React from 'react';

const GameCompletion = ({ 
  points, 
  steps, 
  path,
  success = true,
  levelName = "Level",
  onRestart, 
  onMainMenu,
  onBackToLevels,
  onNextLevel = null,
  isLevelComplete = false,
  hasNextLevel = false
}) => {
  // Calculate performance rating
  const getPerformanceRating = () => {
    if (!success) return { emoji: '💀', text: 'Mission Failed', color: 'text-red-600' };
    if (steps <= 4) return { emoji: '🌟', text: 'Perfect!', color: 'text-yellow-500' };
    if (steps <= 6) return { emoji: '⭐', text: 'Excellent', color: 'text-blue-600' };
    if (steps <= 8) return { emoji: '👍', text: 'Good', color: 'text-green-600' };
    return { emoji: '✅', text: 'Complete', color: 'text-gray-600' };
  };

  const performance = getPerformanceRating();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 text-center">
        {/* Success/Failure Header */}
        <div className="mb-6">
          {success ? (
            <div>
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold text-green-600 mb-2">
                {isLevelComplete ? 'LEVEL COMPLETE!' : 'EVACUATION SUCCESSFUL!'}
              </h1>
              <h2 className="text-xl text-gray-700">{levelName}</h2>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-4">💥</div>
              <h1 className="text-3xl font-bold text-red-600 mb-2">GAME OVER</h1>
              <h2 className="text-xl text-gray-700">The evacuation failed</h2>
            </div>
          )}
        </div>

        {/* Performance Rating */}
        <div className="mb-6">
          <div className="text-4xl mb-2">{performance.emoji}</div>
          <div className={`text-2xl font-bold ${performance.color}`}>
            {performance.text}
          </div>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-600">{points}</div>
            <div className="text-sm text-gray-600">Final Score</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-600">{steps}</div>
            <div className="text-sm text-gray-600">Steps Taken</div>
          </div>
        </div>

        {/* Route Summary */}
        {success && path && path.length > 1 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Evacuation Route:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {path.map((locationId, index) => (
                <React.Fragment key={locationId}>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    index === 0 
                      ? 'bg-blue-100 text-blue-700' 
                      : index === path.length - 1 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                  }`}>
                    {locationId === 'home' ? '🏠 Home' : 
                     locationId === 'shelter' ? '🛡️ Shelter' : 
                     locationId.charAt(0).toUpperCase() + locationId.slice(1)}
                  </span>
                  {index < path.length - 1 && (
                    <span className="text-gray-400">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Failure Message */}
        {!success && (
          <div className="mb-8 p-4 bg-red-50 rounded-lg">
            <p className="text-red-700">
              Don't give up! Study the map, plan your route carefully, and try again. 
              Remember to avoid flooded areas and choose the safest paths to the shelter.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Success Actions */}
          {success && isLevelComplete && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {hasNextLevel && onNextLevel && (
                <button
                  onClick={onNextLevel}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                >
                  🚀 Next Level
                </button>
              )}
              
              <button
                onClick={onRestart}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                🔄 Replay Level
              </button>
              
              <button
                onClick={onBackToLevels}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                📋 Level Select
              </button>
            </div>
          )}

          {/* Failure Actions */}
          {!success && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onRestart}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
              >
                🔄 Try Again
              </button>
              
              <button
                onClick={onBackToLevels}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                📋 Level Select
              </button>
            </div>
          )}

          {/* Common Actions */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onMainMenu}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              🏠 Main Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCompletion;