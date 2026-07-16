import React, { useState, useEffect } from 'react';
import StatsPage from './StatsPage';
import InfoPage from './InfoPage';
import { GENRES, ERAS } from '../utils/gameConfig';
import CheckboxDropdown from './CheckboxDropdown';
import './Title.css';

const HAS_SEEN_INFO_KEY = 'chord-has-seen-info';
const LEGACY_VISIT_KEY = 'chord-last-visit';

const hasSeenIntro = () =>
  localStorage.getItem(HAS_SEEN_INFO_KEY) === 'true' ||
  Boolean(localStorage.getItem(LEGACY_VISIT_KEY));

const markIntroSeen = () => {
  localStorage.setItem(HAS_SEEN_INFO_KEY, 'true');
  localStorage.removeItem(LEGACY_VISIT_KEY);
};

const Title = ({
  artist1Genre, setArtist1Genre, 
  artist1Era, setArtist1Era,
  artist2Genre, setArtist2Genre,
  artist2Era, setArtist2Era,
  onShuffle,
  onRewind,
}) => {
  const [currentPage, setCurrentPage] = useState(() =>
    hasSeenIntro() ? null : 'info'
  );

  useEffect(() => {
    if (localStorage.getItem(LEGACY_VISIT_KEY)) {
      markIntroSeen();
    }
  }, []);

  // Mark once shown so Strict Mode / refreshes don't re-open forever.
  useEffect(() => {
    if (currentPage === 'info') {
      markIntroSeen();
    }
  }, [currentPage]);

  const handleIconClick = (page) => {
    setCurrentPage(page);
  };

  const closePage = () => {
    setCurrentPage(null);
  };

  return (
    <div id="titleholder">
      <div className="header-brand">
        <h1 className="title">Chord</h1>
      </div>

      <div className="header-filters">
        <div className="filter-cluster">
          <div className="filter-group">
            <span className="filter-group-label">Start</span>
            <div className="selector">
              <CheckboxDropdown
                label="Genre"
                options={GENRES}
                selectedValues={artist1Genre}
                onChange={setArtist1Genre}
                allOptionLabel="All Genres"
              />
              <CheckboxDropdown
                label="Era"
                options={ERAS}
                selectedValues={artist1Era}
                onChange={setArtist1Era}
                allOptionLabel="All Time"
              />
            </div>
          </div>

          <div className="filter-divider" />

          <div className="filter-group">
            <span className="filter-group-label">Goal</span>
            <div className="selector">
              <CheckboxDropdown
                label="Genre"
                options={GENRES}
                selectedValues={artist2Genre}
                onChange={setArtist2Genre}
                allOptionLabel="All Genres"
              />
              <CheckboxDropdown
                label="Era"
                options={ERAS}
                selectedValues={artist2Era}
                onChange={setArtist2Era}
                allOptionLabel="All Time"
              />
            </div>
          </div>

          <div className="filter-divider" />

          <div className="filter-actions">
            <button
              type="button"
              className="rewind-btn has-action-hint"
              onClick={onRewind}
              aria-label="Rewind — remove your most recent song and go back one step"
            >
              <svg className="action-btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 3-6.7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 4v5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Rewind
              <span className="action-hint-bubble" role="tooltip">
                Remove your most recent song and go back one step
              </span>
            </button>
            <button
              type="button"
              className="go-btn has-action-hint"
              onClick={onShuffle}
              aria-label="Shuffle — pick new random start and goal artists using your current filters"
            >
              <svg className="action-btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 18h-8.4c-1.3 0-2.5-.6-3.3-1.7l-.6-.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m18 8 4-4-4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Shuffle
              <span className="action-hint-bubble" role="tooltip">
                Pick new random start and goal artists using your current filters
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="header-actions">
        <div className="icon-buttons">
          <button
            type="button"
            className="icon-btn has-action-hint has-action-hint--end"
            onClick={() => handleIconClick('info')}
            aria-label="Info — how to play Chord"
          >
            <img
              className="button"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxZGI5NTQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbmZvLWljb24gbHVjaWRlLWluZm8iPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTEyIDE2di00Ii8+PHBhdGggZD0iTTEyIDhoLjAxIi8+PC9zdmc+"
              alt=""
              aria-hidden="true"
            />
            <span className="action-hint-bubble" role="tooltip">
              How to play Chord
            </span>
          </button>
          <button
            type="button"
            className="icon-btn has-action-hint has-action-hint--end"
            onClick={() => handleIconClick('stats')}
            aria-label="Stats — view your game history and win rate"
          >
            <img
              className="button"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxZGI5NTQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGFydC1uby1heGVzLWNvbHVtbi1pbmNyZWFzaW5nLWljb24gbHVjaWRlLWNoYXJ0LW5vLWF4ZXMtY29sdW1uLWluY3JlYXNpbmciPjxwYXRoIGQ9Ik01IDIxdi02Ii8+PHBhdGggZD0iTTEyIDIxVjkiLz48cGF0aCBkPSJNMTkgMjFWMyIvPjwvc3ZnPg=="
              alt=""
              aria-hidden="true"
            />
            <span className="action-hint-bubble" role="tooltip">
              View your game history and win rate
            </span>
          </button>
        </div>
      </div>

      {currentPage === 'stats' && <StatsPage onClose={closePage} />}
      {currentPage === 'info' && <InfoPage onClose={closePage} />}
    </div>
  );
};

export default Title;