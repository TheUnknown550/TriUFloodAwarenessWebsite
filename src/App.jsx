import React, { useState } from 'react';
import { WelcomePage, GameScenario, LevelSelect } from './components';
import { useGameState } from './hooks';

// Main App Component with multi-level game navigation
function App() {
  const [currentPage, setCurrentPage] = useState('welcome'); // welcome, levelSelect, game
  const gameState = useGameState();

  const handleStartGame = () => {
    setCurrentPage('levelSelect');
  };

  const handleLevelSelect = (levelNumber) => {
    if (gameState.startLevel(levelNumber)) {
      setCurrentPage('game');
    } else {
      // If level couldn't be started, show error or stay on level select
      console.error(`Failed to start level ${levelNumber}`);
    }
  };

  const handleBackToLevels = () => {
    setCurrentPage('levelSelect');
  };

  const handleMainMenu = () => {
    setCurrentPage('welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      {currentPage === 'welcome' && (
        <WelcomePage onStartScenario={handleStartGame} />
      )}
      
      {currentPage === 'levelSelect' && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <LevelSelect 
            unlockedLevels={gameState.unlockedLevels}
            currentLevel={gameState.currentLevel}
            onLevelSelect={handleLevelSelect}
          />
          
          <div className="text-center mt-4 sm:mt-6">
            <button
              onClick={handleMainMenu}
              className="px-4 sm:px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
            >
              🏠 Back to Main Menu
            </button>
          </div>
        </div>
      )}
      
      {currentPage === 'game' && (
        <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-4 lg:py-8">
          <GameScenario 
            gameState={gameState}
            onRestart={() => gameState.resetGame()}
            onBackToLevels={handleBackToLevels}
            onMainMenu={handleMainMenu}
          />
        </div>
      )}
    </div>
  );
}

export default App;
