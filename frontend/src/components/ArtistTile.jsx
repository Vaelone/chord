import React from 'react';

const ArtistTileContent = ({ songInfo, highlightedText, textColor }) => {
  return (
    <div className="songInfo" style={{ color: textColor || 'rgb(255,255,255)' }}>
      {highlightedText ? (
        songInfo.split(highlightedText).reduce((prev, current, i) => {
          if (!i) return [current];
          return prev.concat(
            <span style={{ color: 'yellow' }} key={i}>
              {highlightedText}
            </span>,
            current
          );
        }, [])
      ) : (
        songInfo
      )}
    </div>
  );
};

export default ArtistTileContent;
