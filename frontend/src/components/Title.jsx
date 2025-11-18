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
      <h1 className="title" style={{ textAlign: 'center', marginRight: 'auto' }}>Chord</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: 'auto', height: '70%', width: '20%'}}>
        <img className="button" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxZGI5NTQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbmZvLWljb24gbHVjaWRlLWluZm8iPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTEyIDE2di00Ii8+PHBhdGggZD0iTTEyIDhoLjAxIi8+PC9zdmc+" alt="Stats" onClick={() => handleIconClick('stats')} style={{ cursor: 'pointer' }} />
        <img className="button" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxZGI5NTQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGFydC1uby1heGVzLWNvbHVtbi1pbmNyZWFzaW5nLWljb24gbHVjaWRlLWNoYXJ0LW5vLWF4ZXMtY29sdW1uLWluY3JlYXNpbmciPjxwYXRoIGQ9Ik01IDIxdi02Ii8+PHBhdGggZD0iTTEyIDIxVjkiLz48cGF0aCBkPSJNMTkgMjFWMyIvPjwvc3ZnPg==" alt="Info" onClick={() => handleIconClick('info')} style={{ cursor: 'pointer' }} />
        {/* <img className="button" src="https://www.svgrepo.com/show/13688/settings.svg" alt="Settings" onClick={() => handleIconClick('settings')} style={{ cursor: 'pointer' }} /> */}
      </div>

      {currentPage === 'stats' && <StatsPage onClose={closePage} />}
      {currentPage === 'info' && <InfoPage onClose={closePage} />}
      {currentPage === 'settings' && <SettingsPage onClose={closePage} />}
    </div>
  );
};

export default Title;
