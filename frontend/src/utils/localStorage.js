// src/utils/localStorage.js

export const saveLocalStats = (stats) => {
    localStorage.setItem('gameStats', JSON.stringify(stats));
  };
  
  export const loadLocalStats = () => {
    const storedStats = localStorage.getItem('gameStats');
    return storedStats ? JSON.parse(storedStats) : null;
  };
  