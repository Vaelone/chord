import React from 'react';

const SearchResult = ({ track, onSelect }) => {
    return (
        <div className="songsearch" onClick={() => onSelect(track)}>
            <img className="searchicon" src={track.album.images[0]?.url || 'default-image.png'} alt={`${track.name} cover`} />
            <div className="searchtitle">{track.name}</div>
            <div className="searchartist">{track.artists.map(artist => artist.name).join(', ')}</div>
        </div>
    );
};

export default SearchResult;
