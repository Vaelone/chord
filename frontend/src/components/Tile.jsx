import React from 'react';
import ArtistTileContent from './ArtistTile';
import InputTileContent from './InputTile';
import './Tile.css';

const Tile = ({
  iconSrc,
  isInputTile,
  className,
  linkStatus,
  tileMarker,
  ...rest
}) => {
  const isPlaceholder = iconSrc?.includes('Question_mark');
  const ringClass =
    linkStatus === 'valid'
      ? ' tile-photo--valid'
      : linkStatus === 'invalid'
        ? ' tile-photo--invalid'
        : '';

  const markerClass =
    tileMarker === 'start'
      ? 'tile-marker tile-marker--start'
      : tileMarker === 'goal'
        ? 'tile-marker tile-marker--goal'
        : typeof tileMarker === 'number'
          ? 'tile-marker tile-marker--step'
          : null;

  const markerLabel =
    tileMarker === 'start'
      ? 'Start'
      : tileMarker === 'goal'
        ? 'Goal'
        : typeof tileMarker === 'number'
          ? `Song ${tileMarker}`
          : null;

  const markerContent = tileMarker;

  return (
    <div className={`${isInputTile ? 'inputtile' : 'artist-tile'} ${className || ''}`}>
      <div className="tile-photo-wrapper">
        {tileMarker === 'start' ? (
          <span className="tile-marker tile-marker--start" aria-label="Start" role="img">
            <svg
              className="tile-marker-pin-icon"
              viewBox="0 0 24 30"
              aria-hidden="true"
            >
              <path
                d="M12 1.5C8.41 1.5 5.5 4.41 5.5 8c0 4.66 6.5 13.5 6.5 13.5S18.5 12.66 18.5 8c0-3.59-2.91-6.5-6.5-6.5z"
                fill="#db4437"
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="8" r="2.75" fill="rgba(18, 18, 18, 0.38)" />
            </svg>
          </span>
        ) : tileMarker === 'goal' ? (
          <span className="tile-marker tile-marker--goal" aria-label="Goal" role="img">
            <svg
              className="tile-marker-flag-icon"
              viewBox="0 0 20 24"
              aria-hidden="true"
            >
              <line
                x1="4"
                y1="2"
                x2="4"
                y2="22"
                stroke="var(--accent-bright)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M6 3 H18 L15 8 L18 13 H6 Z" fill="var(--accent-bright)" />
            </svg>
          </span>
        ) : markerClass ? (
          <span className={markerClass} aria-label={markerLabel}>
            {markerContent}
          </span>
        ) : null}
        <div className={`tile-photo${isPlaceholder ? ' is-placeholder' : ''}${ringClass}`}>
          {isPlaceholder ? (
            <span className="tile-placeholder">?</span>
          ) : (
            <img className="tile-icon" src={iconSrc} alt="" />
          )}
        </div>
      </div>
      {isInputTile ? (
        <InputTileContent {...rest} />
      ) : (
        <ArtistTileContent {...rest} linkStatus={linkStatus} />
      )}
    </div>
  );
}

export default Tile;
