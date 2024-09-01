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
    <div id="titleholder" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <h1 className="title" style={{ textAlign: 'left', marginRight: 'auto' }}>Chord</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: 'auto', height: '70%', width: '20%'}}>
        <img className="button" src="https://static.thenounproject.com/png/5639-200.png" alt="Stats" onClick={() => handleIconClick('stats')} style={{ cursor: 'pointer' }} />
        <img className="button" src="https://www.svgrepo.com/show/12134/info-circle.svg" alt="Info" onClick={() => handleIconClick('info')} style={{ cursor: 'pointer' }} />
        {/* <img className="button" src="https://www.svgrepo.com/show/13688/settings.svg" alt="Settings" onClick={() => handleIconClick('settings')} style={{ cursor: 'pointer' }} /> */}
      </div>

      {currentPage === 'stats' && <StatsPage onClose={closePage} />}
      {currentPage === 'info' && <InfoPage onClose={closePage} />}
      {currentPage === 'settings' && <SettingsPage onClose={closePage} />}
    </div>
  );
};

export default Title;
