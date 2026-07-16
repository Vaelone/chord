import React from 'react';
import SearchResult from './SearchResult';

const InputTileContent = ({
  handleInputChange,
  inputValue,
  tracks,
  onSelect,
  displayUpwards,
  noMatchHint,
  currentArtistLabel
}) => {
  const showHint = noMatchHint && tracks.length === 0;

  return (
    <div
      className="inputdiv"
      style={{ flexDirection: displayUpwards ? 'column-reverse' : 'column' }}
    >
      <input
        className="guess-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter linking song here..."
      />

      <div
        className="search-results-container"
        style={{
          bottom: displayUpwards ? '100%' : 'auto',
          top: displayUpwards ? 'auto' : '100%',
        }}
      >
        {showHint ? (
          <div className="search-hint">
            No songs featuring{' '}
            <span className="search-hint-artist">
              {currentArtistLabel || 'this artist'}
            </span>
            . Try one of their collaborations.
          </div>
        ) : (
          tracks.slice(0, 3).map((track) => (
            <SearchResult key={track.id} track={track} onSelect={onSelect} />
          ))
        )}
      </div>
    </div>
  );
};

export default InputTileContent;
