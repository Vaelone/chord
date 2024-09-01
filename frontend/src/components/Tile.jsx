import React from 'react';
import SearchResult from './SearchResult';

const Tile = ({
  iconSrc,
  songInfo,
  highlightedText,
  isInputTile,
  handleInputChange,
  onSelect,
  tracks,
  textColor,
  displayUpwards,
  className, // Accept the className prop
}) => {
  // Style for the song info text, ensuring it is centered
  const songInfoStyle = {
    color: textColor || 'rgb(255,255,255)',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  return (
    <div 
      className={`${isInputTile ? 'inputtile' : 'artist-tile'} ${className}`} // Apply the className prop
    >
      <img id="icon" src={iconSrc} alt="icon" style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
      {isInputTile ? (
        <div
          id="inputdiv"
          style={{
            display: 'flex',
            flexDirection: displayUpwards ? 'column-reverse' : 'column',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <input id="guess" type="text" onChange={handleInputChange} />
          <div style={{ position: 'absolute', bottom: displayUpwards ? '100%' : 'auto', top: displayUpwards ? 'auto' : '100%' }}>
            {tracks.map((track) => (
              <SearchResult key={track.id} track={track} onSelect={onSelect} />
            ))}
          </div>
        </div>
      ) : (
        <div id="songInfo" style={songInfoStyle}>
          {highlightedText ? (
            songInfo.split(highlightedText).reduce((prev, current, i) => {
              if (!i) return [current];
              return prev.concat(<span style={{ color: 'yellow' }} key={i}>{highlightedText}</span>, current);
            }, [])
          ) : (
            songInfo
          )}
        </div>
      )}
    </div>
  );
};

export default Tile;
