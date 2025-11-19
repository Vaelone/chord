import React from 'react';
import ArtistTileContent from './ArtistTile';
import InputTileContent from './InputTile';
import './Tile.css';

const Tile = ({
  iconSrc,
  isInputTile,
  className,
  ...rest   // everything else forwarded
}) => {
  return (
    <div className={`${isInputTile ? 'inputtile' : 'artist-tile'} ${className}`}>
      <img id="icon" src={iconSrc} alt="icon" />
      {isInputTile ? (
        <InputTileContent {...rest} />
      ) : (
        <ArtistTileContent {...rest} />
      )}
    </div>
  );
}

export default Tile;
