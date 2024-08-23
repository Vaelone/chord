// src/components/Tile.jsx
import React from 'react';

const Tile = ({ iconSrc, songInfo, isInputTile, handleInputChange }) => {
  return (
    <div id="tile" className={isInputTile ? 'inputtile' : ''}>
      <img id="icon" src={iconSrc} alt="icon" />
      {isInputTile ? (
        <div id="inputdiv">
          <input id="guess" type="text" onInput={handleInputChange} />
        </div>
      ) : (
        <div id="songInfo">{songInfo}</div>
      )}
    </div>
  );
};

export default Tile;
