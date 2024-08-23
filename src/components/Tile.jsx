// src/components/Tile.jsx
import React from 'react';
import SearchResult from './SearchResult';

const Tile = ({
  iconSrc,
  songInfo,
  isInputTile,
  handleInputChange,
  onSelect,
  tracks,
  backgroundColor,
}) => {
  const tileStyle = backgroundColor
    ? { backgroundColor }
    : {};

  return (
    <div id="tile" className={isInputTile ? 'inputtile' : 'artist-tile'} style={tileStyle}>
      <img id="icon" src={iconSrc} alt="icon" />
      {isInputTile ? (
        <div id="inputdiv">
          <input id="guess" type="text" onChange={handleInputChange} />
          {tracks.map((track) => (
            <SearchResult key={track.id} track={track} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div id="songInfo">{songInfo}</div>
      )}
    </div>
  );
};

export default Tile;
