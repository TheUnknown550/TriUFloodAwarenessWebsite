import React from 'react';

const GameStats = ({ 
  points, 
  steps, 
  mistakes = 0, 
  timeRemaining = null,
  currentLevel = 1,
  levelConfig = null
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (!timeRemaining || !levelConfig?.timeLimit) return 'text-gray-600';
    const percentage = (timeRemaining / levelConfig.timeLimit) * 100;
    if (percentage <= 25) return 'text-red-600 animate-pulse';
    if (percentage <= 50) return 'text-orange-500';
    return 'text-green-600';
  };

  const getMistakeColor = () => {
    if (!levelConfig?.maxMistakes) return 'text-gray-600';
    const percentage = (mistakes / levelConfig.maxMistakes) * 100;
    if (percentage >= 75) return 'text-red-600';
    if (percentage >= 50) return 'text-orange-500';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-3 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600">
          🚨 Emergency Evacuation - Level {currentLevel}
        </h1>
        {levelConfig && (
          <div className="text-sm text-gray-600">
            {levelConfig.difficulty} Mode
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Basic Stats */}
        <div className="col-span-2 sm:col-span-1 flex items-center gap-3 sm:gap-6">
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold text-blue-600">{points}</div>
            <div className="text-xs sm:text-sm text-gray-600">Points</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold text-orange-600">{steps}</div>
            <div className="text-xs sm:text-sm text-gray-600">Steps</div>
          </div>
        </div>
        
        {/* Level-specific constraints */}
        <div className="col-span-2 sm:col-span-1 flex items-center gap-3 sm:gap-6 justify-end sm:justify-start">
          {/* Timer */}
          {timeRemaining !== null && levelConfig?.timeLimit && (
            <div className="text-center">
              <div className={`text-lg sm:text-xl font-bold ${getTimerColor()}`}>
                ⏱️ {formatTime(timeRemaining)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Time Left</div>
            </div>
          )}
          
          {/* Mistake Counter */}
          {levelConfig?.maxMistakes !== undefined && (
            <div className="text-center">
              <div className={`text-lg sm:text-xl font-bold ${getMistakeColor()}`}>
                ❌ {mistakes}/{levelConfig.maxMistakes}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                {levelConfig.maxMistakes === 0 ? 'Perfect Run!' : 'Mistakes'}
              </div>
            </div>
          )}
          
          {/* Bonus Multiplier */}
          {levelConfig?.bonusMultiplier && levelConfig.bonusMultiplier > 1 && (
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-purple-600">
                💰 {levelConfig.bonusMultiplier}x
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Bonus</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Warning messages for critical states */}
      {timeRemaining !== null && timeRemaining <= 30 && (
        <div className="mt-2 text-center text-red-600 text-sm sm:text-base font-bold animate-pulse">
          ⚠️ HURRY! Time is running out!
        </div>
      )}
      
      {levelConfig?.maxMistakes && mistakes >= levelConfig.maxMistakes - 1 && mistakes < levelConfig.maxMistakes && (
        <div className="mt-2 text-center text-orange-600 text-sm sm:text-base font-bold">
          ⚠️ One mistake left! Choose carefully!
        </div>
      )}
    </div>
  );
};

export default GameStats;