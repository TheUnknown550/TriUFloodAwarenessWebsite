import React from 'react';
import { GAME_SCENARIO } from '../data';

const ProgressTracker = ({ path, currentLocation }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Your Route Progress:</h3>
      <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 overflow-x-auto pb-2">
        {GAME_SCENARIO.locations.map((location, index) => {
          const isVisited = path.includes(location.id);
          const isCurrent = location.id === currentLocation;
          
          return (
            <div key={location.id} className="flex items-center flex-shrink-0">
              <div className={`
                flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 text-sm sm:text-base
                ${isCurrent 
                  ? 'bg-blue-500 text-white border-blue-500 animate-pulse' 
                  : isVisited 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'bg-gray-200 text-gray-500 border-gray-300'
                }
              `}>
                {isCurrent ? '👤' : isVisited ? '✓' : index + 1}
              </div>
              <div className={`ml-2 ${isCurrent ? 'font-bold' : ''} hidden sm:block`}>
                <div className="text-xs sm:text-sm whitespace-nowrap">{location.name}</div>
              </div>
              {index < GAME_SCENARIO.locations.length - 1 && (
                <div className="mx-2 sm:mx-3 lg:mx-4 text-gray-400 text-sm sm:text-base">→</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;