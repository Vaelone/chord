import React, { useState } from 'react';
import StatsPage from './StatsPage';
import InfoPage from './InfoPage';
import SettingsPage from './SettingsPage';

const Title = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const handleIconClick = (page) => {
    setCurrentPage(page);
  };

  const closePage = () => {
    setCurrentPage(null);
  };

  return (
    <div id="titleholder" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 id="title" style={{ textAlign: 'left' }}>Chord</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="../assets/stats-icon.png" alt="Stats" onClick={() => handleIconClick('stats')} style={{ cursor: 'pointer' }} />
        <img src="../assets/Info-icon.png" alt="Info" onClick={() => handleIconClick('info')} style={{ cursor: 'pointer' }} />
        <img src="../assets/settings-icon.png" alt="Settings" onClick={() => handleIconClick('settings')} style={{ cursor: 'pointer' }} />
      </div>

      {currentPage === 'stats' && <StatsPage gameStats={gameStats} onClose={closePage} />}
      {currentPage === 'info' && <InfoPage onClose={closePage} />}
      {currentPage === 'settings' && <SettingsPage onClose={closePage} />}
    </div>
  );
};

export default Title;
