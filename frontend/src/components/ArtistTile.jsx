import React from 'react';

const ArtistTileContent = ({
  songInfo,
  songTitle,
  artists,
  connectingArtist,
  linkStatus,
}) => {
  if (songTitle && artists?.length) {
    return (
      <div className="songInfo">
        <div className="songInfo-title">{songTitle}</div>
        <div className="songInfo-chips">
          {artists.map((artist) => {
            const isLinked =
              linkStatus === 'valid' && artist === connectingArtist;
            const isFailed =
              linkStatus === 'invalid' && artist === artists[0];

            return (
              <span
                key={artist}
                className={[
                  'artist-chip',
                  isLinked ? 'artist-chip--linked' : '',
                  isFailed ? 'artist-chip--failed' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {isLinked && (
                  <span className="artist-chip-check" aria-hidden="true">
                    ✓
                  </span>
                )}
                {artist}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  return <div className="songInfo">{songInfo}</div>;
};

export default ArtistTileContent;
