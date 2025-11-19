import React, { useState } from 'react';
import StatsPage from './StatsPage';
import InfoPage from './InfoPage';
import { GENRES, ERAS } from '../utils/gameConfig';
import CheckboxDropdown from './CheckboxDropdown';
import './Title.css';

const Title = ({ 
  artist1Genre, setArtist1Genre, 
  artist1Era, setArtist1Era,
  artist2Genre, setArtist2Genre,
  artist2Era, setArtist2Era,
  onRefresh
}) => {
  const [currentPage, setCurrentPage] = useState(null);

  // Cause info/stats page to display
  const handleIconClick = (page) => {
    setCurrentPage(page);
  };

  // close the info/stats page so we can just see the classic app screen
  const closePage = () => {
    setCurrentPage(null);
  };

  return (
    <div id="titleholder">
      <h1 className="title">Chord</h1>
      
      {/* Artist 1 Selectors */}
      <div className="selector">
        <CheckboxDropdown
          label="Genre 1"
          options={GENRES}
          selectedValues={artist1Genre}
          onChange={setArtist1Genre}
          allOptionLabel="All Genres"
        />
        <CheckboxDropdown
          label="Era 1"
          options={ERAS}
          selectedValues={artist1Era}
          onChange={setArtist1Era}
          allOptionLabel="All Time"
        />
      </div>

      {/* Artist 2 Selectors */}
      <div className="selector">
        <CheckboxDropdown
          label="Genre 2"
          options={GENRES}
          selectedValues={artist2Genre}
          onChange={setArtist2Genre}
          allOptionLabel="All Genres"
        />
        <CheckboxDropdown
          label="Era 2"
          options={ERAS}
          selectedValues={artist2Era}
          onChange={setArtist2Era}
          allOptionLabel="All Time"
        />
      </div>

      {/* Refresh Icon Button */}
      <img 
        className="button refresh-button"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxZGI5NTQiIHN0cm9rZS13aWR0aD0iMi43NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1yb3RhdGUtY2N3LWljb24gbHVjaWRlLXJvdGF0ZS1jY3ciPjxwYXRoIGQ9Ik0zIDEyYTkgOSAwIDEgMCA5LTkgOS43NSA5Ljc1IDAgMCAwLTYuNzQgMi43NEwzIDgiLz48cGF0aCBkPSJNMyAzdjVoNSIvPjwvc3ZnPg=="
        alt="Refresh"
        onClick={onRefresh}
      />

      <div className="icon-buttons">
        <img className="button" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxZGI5NTQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbmZvLWljb24gbHVjaWRlLWluZm8iPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTEyIDE2di00Ii8+PHBhdGggZD0iTTEyIDhoLjAxIi8+PC9zdmc+" alt="Stats" onClick={() => handleIconClick('stats')} />
        <img className="button" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxZGI5NTQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGFydC1uby1heGVzLWNvbHVtbi1pbmNyZWFzaW5nLWljb24gbHVjaWRlLWNoYXJ0LW5vLWF4ZXMtY29sdW1uLWluY3JlYXNpbmciPjxwYXRoIGQ9Ik01IDIxdi02Ii8+PHBhdGggZD0iTTEyIDIxVjkiLz48cGF0aCBkPSJNMTkgMjFWMyIvPjwvc3ZnPg==" alt="Info" onClick={() => handleIconClick('info')} />
      </div>

      {currentPage === 'stats' && <StatsPage onClose={closePage} />}
      {currentPage === 'info' && <InfoPage onClose={closePage} />}
    </div>
  );
};

export default Title;