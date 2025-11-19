import React from 'react';
import SearchResult from './SearchResult';

const InputTileContent = ({
  handleInputChange,
  tracks,
  onSelect,
  displayUpwards
}) => {
  return (
    <div
      id="inputdiv"
      style={{ flexDirection: displayUpwards ? 'column-reverse' : 'column' }}
    >
      <input
        id="guess"
        type="text"
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
        {tracks.slice(0, 3).map((track) => (
          <SearchResult key={track.id} track={track} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default InputTileContent;
