import React from 'react';
import { getStatistics } from '../utils/localStorage';

const StatsPage = ({ onClose }) => {
  // Retrieve the stats object from localStorage
  const stats = getStatistics() || { gamesPlayed: 0, wins: 0, guesses: [] };

  // Calculate additional stats
  const totalGuesses = stats.guesses.reduce((total, numGuesses) => total + numGuesses, 0);
  const averageGuesses = stats.gamesPlayed > 0 ? (totalGuesses / stats.gamesPlayed).toFixed(1) : 0;
  const bestScore = stats.guesses.length > 0 ? Math.min(...stats.guesses) : 'N/A';
  const winRate = stats.gamesPlayed > 0 ? ((stats.wins / stats.gamesPlayed) * 100).toFixed(0) : '0.00';

  return (
    <div id = "statsPage" >
      <div id="statsTitle" >
        Stats
        <span 
          onClick={onClose} 
          style={{ 
            position: 'absolute', 
            right: 0, 
            top: 0, 
            cursor: 'pointer', 
            padding: '5px',
            fontSize: '20px',
            color: 'red'
          }}
        >
          ❌
        </span>
      </div>
      <div id = "statsGridHolder">
        <div id = "graph" className = "statsGrid" style = {{display:'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            
        </div>
        <div className = "statsGrid" style = {{display:'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            <div>Your Win Rate</div>
            <div className = "statistic">{winRate}%</div>
        </div>

        <div className = "statsGrid" style = {{display:'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            <div>Your Average Score</div>
            <div className = "statistic">{averageGuesses}</div>
        </div>
        <div className = "statsGrid" style = {{display:'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            <div>Your Most Used Connecting Artist</div>
        </div>
        <div className = "statsGrid" style = {{display:'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            <div>Total Games Played</div>
            <div className = "statistic">{stats.gamesPlayed}</div>
        </div>
      </div>
      {/* <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <div>Total Games Played: {stats.gamesPlayed}</div>
        <div>Average Songs per Puzzle: {averageGuesses}</div>
        <div>Best Score: {bestScore} Songs</div>
        <div>Win Rate: {winRate}%</div>
      </div> */}
      
    </div>
  );
};

export default StatsPage;
