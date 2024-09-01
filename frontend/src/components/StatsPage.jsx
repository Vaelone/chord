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
  const guessCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fails: 0 };

  // Calculate the counts
  stats.guesses.forEach(guesses => {
    if (guesses >= 3 && guesses <= 8) {
      guessCounts[guesses-2]++;
    } 
  });
  const losses = stats.gamesPlayed - stats.wins;
  const maxArrayVal = Math.max(...Object.values(guessCounts));
  const val1 = Math.max((guessCounts[1]/maxArrayVal)*80,8)
  const val2 = Math.max((guessCounts[2]/maxArrayVal)*80,8)
  const val3 = Math.max((guessCounts[3]/maxArrayVal)*80,8)
  const val4 = Math.max((guessCounts[4]/maxArrayVal)*80,8)
  const val5 = Math.max((guessCounts[5]/maxArrayVal)*80,8)
  const val6 = Math.max(((guessCounts[6]-losses)/maxArrayVal)*80,8)
  const valLost = Math.max((losses/maxArrayVal)*80,8)
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
        <div id = "graph" className = "statsGrid" style = {{display:'flex', justifyContent: 'space-around'}}>'
          <div className = "section">
            <div className = "bar" style = {{height:`${val1}%`}}>{guessCounts[1]}</div>
            <div className = "label">1</div>
          </div>
          <div className = "section">
            <div className = "bar" style = {{height:`${val2}%`}}>{guessCounts[2]}</div>
            <div className = "label">2</div>
          </div>
          <div className = "section">
            <div className = "bar" style = {{height:`${val3}%`}}>{guessCounts[3]}</div>
            <div className = "label">3</div>
          </div>
          <div className = "section">
            <div className = "bar" style = {{height:`${val4}%`}}>{guessCounts[4]}</div>
            <div className = "label">4</div>
          </div>
          <div className = "section">
            <div className = "bar" style = {{height:`${val5}%`}}>{guessCounts[5]}</div>
            <div className = "label">5</div>
          </div>
          <div className = "section">
            <div className = "bar" style = {{height:`${val6}%`}}>{(guessCounts[6]-losses)}</div>
            <div className = "label">6</div>
          </div>
          <div className = "section">
            <div className = "bar" style = {{height:`${valLost}%`}}>{losses}</div>
            <div className = "lastLabel">X</div>
          </div>
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
