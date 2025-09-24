import React from 'react';
import { GAME_LEVELS } from '../data/gameLevels';

const LevelSelect = ({ unlockedLevels, onLevelSelect, currentLevel }) => {
  const difficultyColors = {
    'Easy': 'bg-green-500',
    'Medium': 'bg-yellow-500',
    'Hard': 'bg-orange-500',
    'Expert': 'bg-red-600'
  };

  const difficultyBorders = {
    'Easy': 'border-green-200',
    'Medium': 'border-yellow-200',
    'Hard': 'border-orange-200',
    'Expert': 'border-red-200'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
        🎯 Select Difficulty Level
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 text-center">
        Choose your challenge! Each level gets progressively harder with more complex routes and tighter time limits.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {Object.entries(GAME_LEVELS).map(([levelNum, level]) => {
          const levelNumber = parseInt(levelNum);
          const isUnlocked = unlockedLevels.includes(levelNumber);
          const isCurrent = currentLevel === levelNumber;
          
          return (
            <div
              key={levelNum}
              className={`
                relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-200
                ${isUnlocked 
                  ? `cursor-pointer hover:shadow-md ${difficultyBorders[level.difficulty]} ${
                      isCurrent ? 'ring-2 ring-blue-400 bg-blue-50' : 'hover:bg-gray-50'
                    }`
                  : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
                }
              `}
              onClick={() => isUnlocked && onLevelSelect(levelNumber)}
            >
              {/* Lock icon for locked levels */}
              {!isUnlocked && (
                <div className="absolute top-2 right-2">
                  🔒
                </div>
              )}
              
              {/* Current level indicator */}
              {isCurrent && (
                <div className="absolute top-2 right-2">
                  ⭐
                </div>
              )}
              
              <div className="flex items-center justify-between mb-2">
                <h3 className={`text-sm sm:text-base font-bold ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                  Level {levelNum}
                </h3>
                <span className={`
                  px-2 py-1 rounded-full text-xs font-bold text-white
                  ${isUnlocked ? difficultyColors[level.difficulty] : 'bg-gray-400'}
                `}>
                  {level.difficulty}
                </span>
              </div>
              
              <h4 className={`text-sm sm:text-base font-semibold mb-2 ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                {level.name}
              </h4>
              
              <p className={`text-xs sm:text-sm mb-3 ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                {level.description}
              </p>
              
              <div className="flex flex-wrap gap-1 sm:gap-2 text-xs">
                {level.timeLimit && (
                  <span className={`px-2 py-1 rounded ${
                    isUnlocked ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-500'
                  }`}>
                    ⏱️ {Math.floor(level.timeLimit / 60)}:{String(level.timeLimit % 60).padStart(2, '0')} limit
                  </span>
                )}
                
                <span className={`px-2 py-1 rounded ${
                  isUnlocked ? 'bg-orange-100 text-orange-700' : 'bg-gray-200 text-gray-500'
                }`}>
                  ❌ {level.maxMistakes === 0 ? 'No mistakes' : `${level.maxMistakes} mistakes max`}
                </span>
                
                <span className={`px-2 py-1 rounded ${
                  isUnlocked ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                }`}>
                  💰 {level.bonusMultiplier}x points
                </span>
              </div>
              
              {!isUnlocked && (
                <div className="mt-2 text-xs text-gray-400 italic">
                  Complete level {levelNumber - 1} to unlock
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            🔒 <span>Locked</span>
          </span>
          <span className="flex items-center gap-1">
            ⭐ <span>Current</span>
          </span>
          <span className="flex items-center gap-1">
            ⏱️ <span>Timed</span>
          </span>
          <span className="flex items-center gap-1">
            ❌ <span>Mistake Limit</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;