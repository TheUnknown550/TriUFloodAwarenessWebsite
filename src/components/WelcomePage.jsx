import React from 'react';

const WelcomePage = ({ onStartScenario }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-2xl bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 text-center">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-600 mb-3 sm:mb-4">
            🌊 Flood Safety Trainer
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6">
            Practice safe flood evacuation through interactive scenarios
          </p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3">
            How it works:
          </h2>
          <ul className="text-sm sm:text-base text-blue-700 space-y-2 text-left">
            <li>• Navigate through a realistic neighborhood with multiple locations</li>
            <li>• Use the interactive flood map to see dangerous areas and safe routes</li>
            <li>• Choose safe routes to avoid flooded areas of varying severity</li>
            <li>• Earn points for making smart evacuation decisions</li>
            <li>• Learn real flood safety principles through immersive practice</li>
            <li>• Experience realistic flood scenarios in a safe environment</li>
          </ul>
        </div>
        
        <button
          onClick={onStartScenario}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg lg:text-xl font-semibold transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Start Evacuation Scenario 🚨
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;