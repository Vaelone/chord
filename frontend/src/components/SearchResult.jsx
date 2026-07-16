import React from 'react';
import { getDisplaySongTitle } from '../utils/songTitle';

const SearchResult = ({ track, onSelect }) => {
  const artists = track.artists.map((artist) => artist.name);

  return (
    <div className="songsearch" onClick={() => onSelect(track)}>
      <img
        className="searchicon"
        src={track.album.images[0]?.url || 'default-image.png'}
        alt={`${track.name} cover`}
      />
      <div className="searchtitle">{getDisplaySongTitle(track.name, artists)}</div>
      <div className="searchartist">{artists.join(', ')}</div>
    </div>
  );
};

export default SearchResult;
