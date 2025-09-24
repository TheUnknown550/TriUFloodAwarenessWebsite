import { useState, useEffect } from 'react';
import { GAME_LEVELS } from '../data/gameLevels';

// Custom hook for managing multi-level game state
export const useGameState = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentLocation, setCurrentLocation] = useState('home');
  const [points, setPoints] = useState(0);
  const [steps, setSteps] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameCompleted, setGameCompleted] = useState(false);
  const [path, setPath] = useState(['home']);
  const [mistakes, setMistakes] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [unlockedLevels, setUnlockedLevels] = useState([1]); // Player starts with level 1 unlocked
  const [isLevelInitialized, setIsLevelInitialized] = useState(false);

  // Get current level configuration
  const getCurrentLevel = () => GAME_LEVELS[currentLevel];
  const getCurrentScenario = () => {
    const level = getCurrentLevel();
    return level?.scenario;
  };

  // Timer effect
  useEffect(() => {
    if (gameStartTime && timeRemaining !== null && timeRemaining > 0 && !gameCompleted && !levelCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up!
            setFeedback('⏰ TIME\'S UP! The flood waters caught up to you. Try again with better planning!');
            setGameCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameStartTime, timeRemaining, gameCompleted, levelCompleted]);

  const startLevel = (levelNumber) => {
    const level = GAME_LEVELS[levelNumber];
    if (!level || !unlockedLevels.includes(levelNumber)) return false;

    setCurrentLevel(levelNumber);
    setCurrentLocation('home');
    setPoints(0);
    setSteps(0);
    setFeedback(`🎮 Starting ${level.name}! ${level.description}`);
    setGameCompleted(false);
    setLevelCompleted(false);
    setPath(['home']);
    setMistakes(0);
    setTimeRemaining(level.timeLimit);
    setGameStartTime(level.timeLimit ? Date.now() : null);
    setIsLevelInitialized(true);
    
    return true;
  };

  const resetGame = () => {
    const level = getCurrentLevel();
    if (!level) return; // Can't reset if no level is loaded
    
    setCurrentLocation('home');
    setPoints(0);
    setSteps(0);
    setFeedback(`🔄 Restarting ${level.name}. Plan your route carefully!`);
    setGameCompleted(false);
    setLevelCompleted(false);
    setPath(['home']);
    setMistakes(0);
    setTimeRemaining(level.timeLimit);
    setGameStartTime(level.timeLimit ? Date.now() : null);
    setIsLevelInitialized(true);
  };

  const backtrack = () => {
    if (path.length <= 1) {
      setFeedback('❌ Cannot backtrack from starting location!');
      return false;
    }

    const level = getCurrentLevel();
    const previousLocation = path[path.length - 2];
    
    // Calculate backtrack penalty based on level difficulty
    const penalty = Math.floor(20 * level.bonusMultiplier);
    const timePenalty = Math.floor(30 * level.bonusMultiplier); // seconds
    
    // Apply penalties
    const newPoints = Math.max(0, points - penalty);
    setPoints(newPoints);
    setSteps(steps + 1);
    setMistakes(mistakes + 1);
    
    // Apply time penalty if timer is active
    if (timeRemaining !== null) {
      setTimeRemaining(Math.max(0, timeRemaining - timePenalty));
    }
    
    // Update location and path
    setCurrentLocation(previousLocation);
    setPath(path.slice(0, -1));
    
    setFeedback(`⬅️ BACKTRACKED to ${previousLocation}! Lost ${penalty} points and ${timePenalty}s time as penalty for poor planning.`);
    
    return true;
  };

  const makeMove = (route) => {
    const level = getCurrentLevel();
    const newSteps = steps + 1;
    setSteps(newSteps);
    
    if (route.safe) {
      // Calculate points based on level difficulty and route quality
      let pointsEarned = Math.floor(10 * level.bonusMultiplier);
      
      // Bonus points based on route quality and flood severity
      if (route.floodSeverity === 'none') pointsEarned += Math.floor(5 * level.bonusMultiplier);
      else if (route.floodSeverity === 'low') pointsEarned += Math.floor(3 * level.bonusMultiplier);
      
      const newPoints = points + pointsEarned;
      setPoints(newPoints);
      
      // Create appropriate feedback message based on difficulty
      let feedbackMsg = `✅ Excellent navigation! ${route.description} (+${pointsEarned} points)`;
      if (route.floodSeverity === 'low') {
        feedbackMsg = `✅ Smart choice! Minor flood risk managed safely. (+${pointsEarned} points)`;
      } else if (route.floodSeverity === 'moderate') {
        feedbackMsg = `⚠️ Risky but successful! You handled the moderate flood conditions well. (+${pointsEarned} points)`;
      }
      
      setFeedback(feedbackMsg);
      setCurrentLocation(route.to);
      setPath([...path, route.to]);
      
      // Check if reached shelter (level completed)
      if (route.to === 'shelter') {
        const timeBonusMultiplier = timeRemaining ? Math.max(timeRemaining / 60, 0.5) : 1;
        const efficiencyBonus = Math.max(Math.floor((50 - newSteps * 5) * level.bonusMultiplier * timeBonusMultiplier), Math.floor(10 * level.bonusMultiplier));
        const finalPoints = newPoints + efficiencyBonus;
        setPoints(finalPoints);
        
        let completionMessage = `🎉 LEVEL ${currentLevel} COMPLETE! `;
        completionMessage += `You safely reached the emergency shelter! `;
        completionMessage += `Efficiency bonus: +${efficiencyBonus} points! `;
        completionMessage += `Final Score: ${finalPoints} points`;
        
        // Time bonus message
        if (timeRemaining) {
          completionMessage += ` | Time remaining: ${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
        }
        
        setFeedback(completionMessage);
        setLevelCompleted(true);
        
        // Unlock next level if exists
        const nextLevel = currentLevel + 1;
        if (GAME_LEVELS[nextLevel] && !unlockedLevels.includes(nextLevel)) {
          setUnlockedLevels(prev => [...prev, nextLevel]);
          setFeedback(prev => prev + ` | 🔓 Level ${nextLevel} unlocked!`);
        }
      }
    } else {
      // Dangerous route taken
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      
      // Calculate penalty based on flood severity and level difficulty
      let penalty = 5;
      if (route.floodSeverity === 'high') penalty = Math.floor(15 * level.bonusMultiplier);
      else if (route.floodSeverity === 'severe') penalty = Math.floor(25 * level.bonusMultiplier);
      else if (route.floodSeverity === 'catastrophic') penalty = Math.floor(50 * level.bonusMultiplier);
      else if (route.floodSeverity === 'moderate') penalty = Math.floor(10 * level.bonusMultiplier);
      
      const newPoints = Math.max(0, points - penalty);
      setPoints(newPoints);
      
      // Create severity-appropriate feedback
      let feedbackMsg = '';
      if (route.floodSeverity === 'catastrophic') {
        feedbackMsg = `� CRITICAL ERROR! ${route.description} - You've been swept away by extreme flood conditions! (-${penalty} points)`;
      } else if (route.floodSeverity === 'severe') {
        feedbackMsg = `🚨 DANGEROUS CHOICE! ${route.description} - Severe flooding causes major delays and risk! (-${penalty} points)`;
      } else if (route.floodSeverity === 'high') {
        feedbackMsg = `⚠️ Poor decision! ${route.description} - High flood waters slow your progress significantly! (-${penalty} points)`;
      } else {
        feedbackMsg = `😟 Risky move! ${route.description} - Flood conditions cause delays. (-${penalty} points)`;
      }
      
      setFeedback(feedbackMsg);
      setCurrentLocation(route.to);
      setPath([...path, route.to]);
      
      // Check if max mistakes reached
      if (newMistakes >= level.maxMistakes) {
        setFeedback(prev => prev + ` | 💥 GAME OVER! Too many dangerous choices. The evacuation failed!`);
        setGameCompleted(true);
      }
    }
  };

  return {
    // Current game state
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
    unlockedLevels,
    isLevelInitialized,
    
    // Level management
    getCurrentLevel,
    getCurrentScenario,
    startLevel,
    
    // Game actions
    resetGame,
    makeMove,
    backtrack
  };
};