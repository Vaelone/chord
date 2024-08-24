import React from 'react';
import SearchResult from './SearchResult';

const Tile = ({
  iconSrc,
  songInfo,
  isInputTile,
  handleInputChange,
  onSelect,
  tracks,
  textColor, // Accept textColor as a prop
}) => {
  const songInfoStyle = {
    color: textColor || '#1db954', // Default color if textColor is not provided
    fontWeight: 'bold',
  };

  return (
    <div id="tile" className={isInputTile ? 'inputtile' : 'artist-tile'}>
      <img id="icon" src={iconSrc} alt="icon" />
      {isInputTile ? (
        <div id="inputdiv">
          <input id="guess" type="text" onChange={handleInputChange} />
          {tracks.map((track) => (
            <SearchResult key={track.id} track={track} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div id="songInfo" style={songInfoStyle}>{songInfo}</div>
      )}
    </div>
  );
};

export default Tile;
