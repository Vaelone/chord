// utils/localStorage.js

// Save statistics to localStorage
export const saveStatistics = (stats) => {
    localStorage.setItem('gameStats', JSON.stringify(stats));
  };
  
  // Retrieve statistics from localStorage
  export const getStatistics = () => {
    const stats = localStorage.getItem('gameStats');
    return stats ? JSON.parse(stats) : null;
  };
  