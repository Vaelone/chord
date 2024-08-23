// src/components/TileHolder.jsx
import React, { useState } from 'react';
import Tile from './Tile';

const TileHolder = () => {
  const [tiles, setTiles] = useState([
    {
      iconSrc:
        'https://static.dezeen.com/uploads/2016/08/kanye-west-ikea-collaboration-square_dezeen_936_0.jpg',
      songInfo: 'Kanye West',
      isInputTile: false,
    },
    {
      iconSrc:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
      songInfo: '',
      isInputTile: true,
    },
    {
      iconSrc:
        'https://hips.hearstapps.com/hmg-prod/images/2011-mtv-video-music-awards---arrivals.jpg',
      songInfo: 'Rick Ross',
      isInputTile: false,
    },
  ]);

  const handleInputChange = async (event) => {
    const query = event.target.value;
    const accessToken = await getAccessToken();

    if (query.length > 0) {
      const tracks = await searchTracks(query, accessToken);
      displayResults(tracks);
    } else {
      clearResults();
    }
  };

  const addTile = () => {
    setTiles((prevTiles) => [
      ...prevTiles,
      {
        iconSrc:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
        songInfo: '',
        isInputTile: true,
      },
    ]);
  };

  return (
    <div id="tileholder">
      {tiles.map((tile, index) => (
        <Tile
          key={index}
          iconSrc={tile.iconSrc}
          songInfo={tile.songInfo}
          isInputTile={tile.isInputTile}
          handleInputChange={handleInputChange}
        />
      ))}
    </div>
  );
};

export default TileHolder;
