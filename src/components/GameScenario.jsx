import React, { useState } from 'react';
import { GAME_SCENARIO } from '../data';
import { GAME_LEVELS } from '../data/gameLevels';
import GameStats from './GameStats';
import ProgressTracker from './ProgressTracker';
import LocationDisplay from './LocationDisplay';
import RouteChoices from './RouteChoices';
import GameCompletion from './GameCompletion';
import SimpleFloodMap from './SimpleFloodMap';

const GameScenario = ({ gameState, onRestart, onBackToLevels, onMainMenu }) => {
  // Route preview state
  const [previewRoute, setPreviewRoute] = useState(null);

  // Route preview handlers
  const handleRoutePreview = (route) => {
    setPreviewRoute(route);
  };

  const handleRoutePreviewClear = () => {
    setPreviewRoute(null);
  };
  // Use the gameState passed from App
  const {
    currentLevel,
    currentLocation,
    points,
    steps,
    feedback,
    gameCompleted,
    levelCompleted,
    path,
    mistakes,
    timeRemaining,
    getCurrentLevel,
    getCurrentScenario,
    makeMove,
    backtrack,
    resetGame,
    startLevel,
    isLevelInitialized
  } = gameState;

  // Get current level configuration and scenario
  const levelConfig = getCurrentLevel();
  const scenario = getCurrentScenario();

  // Show loading/initialization screen if level isn't properly initialized
  if (!isLevelInitialized || !levelConfig || !scenario) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Level Not Initialized</h2>
          <p className="text-gray-600 mb-6">
            Please select a level from the level selection screen to start playing.
          </p>
          <button
            onClick={onBackToLevels}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            📋 Go to Level Select
          </button>
        </div>
      </div>
    );
  }

  // Fallback to default scenario if level doesn't load
  const currentScenario = scenario;

  // Find current location data
  const currentLocationData = currentScenario.locations?.find(loc => loc.id === currentLocation);

  // Get available routes from current location
  const availableRoutes = currentScenario.routes?.filter(route => route.from === currentLocation) || [];

  // Game completion (failure) or level completion (success)
  if (gameCompleted || levelCompleted) {
    const isSuccess = levelCompleted;
    const hasNextLevel = levelConfig && Object.keys(GAME_LEVELS).length > currentLevel;
    
    return (
      <GameCompletion 
        points={points}
        steps={steps}
        path={path}
        success={isSuccess}
        levelName={levelConfig?.name || 'Level'}
        onRestart={resetGame}
        onBackToLevels={onBackToLevels}
        onMainMenu={onMainMenu}
        onNextLevel={hasNextLevel ? () => {
          const nextLevel = currentLevel + 1;
          if (startLevel(nextLevel)) {
            // Level started successfully, stay in game
          } else {
            onBackToLevels();
          }
        } : null}
        isLevelComplete={isSuccess}
        hasNextLevel={hasNextLevel}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4 lg:space-y-6">
      {/* Game Header with Stats */}
      <GameStats 
        points={points}
        steps={steps}
        mistakes={mistakes}
        timeRemaining={timeRemaining}
        currentLevel={currentLevel}
        levelConfig={levelConfig}
      />

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <button
          onClick={onBackToLevels}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
        >
          📋 Level Select
        </button>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={resetGame}
            className="px-3 sm:px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm sm:text-base"
          >
            🔄 Restart Level
          </button>
          
          <button
            onClick={onMainMenu}
            className="px-3 sm:px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
          >
            🏠 Main Menu
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        {/* Left Column: Game Content */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 xl:order-1">
          {/* Progress Tracker */}
          <ProgressTracker 
            locations={currentScenario.locations || []}
            path={path}
            currentLocation={currentLocation}
          />

          {/* Current Location */}
          <LocationDisplay 
            location={currentLocationData}
            levelName={levelConfig?.name || 'Current Level'}
            difficulty={levelConfig?.difficulty || 'Unknown'}
          />

          {/* Route Choices */}
          <RouteChoices 
            routes={availableRoutes}
            onRouteSelect={makeMove}
            onBacktrack={backtrack}
            disabled={false}
            levelDifficulty={levelConfig?.difficulty}
            canBacktrack={path.length > 1}
            onRoutePreview={handleRoutePreview}
            onRoutePreviewClear={handleRoutePreviewClear}
          />

          {/* Feedback */}
          {feedback && (
            <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4">
              <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">
                {feedback}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Map */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-1 xl:order-2">
          <SimpleFloodMap 
            scenario={currentScenario}
            currentLocation={currentLocation}
            path={path}
            availableRoutes={availableRoutes}
            levelName={levelConfig?.name || 'Flood Map'}
            previewRoute={previewRoute}
          />
        </div>
      </div>
    </div>
  );
};

export default GameScenario;