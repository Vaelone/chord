import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import { getArtistImages, getAccessToken } from '../utils/spotify';
import { searchTracks } from '../utils/spotify';

const TileHolder = () => {
  let artist1 = "Drake";
  let artist2 = "Ariana Grande"
  const [tiles, setTiles] = useState([
    {
      id: 1,
      iconSrc: '', // Initialize with empty string
      songInfo: artist1,
      isInputTile: false,
    },
    {
      id: 2,
      iconSrc:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
      songInfo: '',
      isInputTile: true,
    },
    {
      id: 3,
      iconSrc: '', // Initialize with empty string
      songInfo: artist2,
      isInputTile: false,
    },
  ]);

  const [tracks, setTracks] = useState([]);
  const [lastArtist, setLastArtist] = useState(artist1);
  const [finalArtist, setFinalArtist] = useState(artist2);

  useEffect(() => {
    const fetchImages = async () => {
      const artist1Images = await getArtistImages(artist1);
      const artist2Images = await getArtistImages(artist2);
      
      setTiles((prevTiles) => prevTiles.map((tile) => {
        if (tile.songInfo === artist1) {
          return {
            ...tile,
            iconSrc: artist1Images[0]?.url || 'default-image.png',
          };
        } else if (tile.songInfo === artist2) {
          return {
            ...tile,
            iconSrc: artist2Images[0]?.url || 'default-image.png',
          };
        }
        return tile;
      }));
    };

    fetchImages();
  }, []); // Empty dependency array to run only once

  const addTile = () => {
    setTiles((prevTiles) => [
      ...prevTiles,
      {
        id: prevTiles.length + 1,
        iconSrc:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
        songInfo: '',
        isInputTile: true,
      },
    ]);
  };

  const handleSelect = (track) => {
    const clickedArtists = track.artists.map((artist) => artist.name);
    
    // Default color is red
    let backgroundColor = 'red'; 
  
    if (clickedArtists.length > 0) {
      const firstArtist = clickedArtists[0];
      if (firstArtist === lastArtist) {
        // Check if finalArtist is also included to set the color to green or yellow
        backgroundColor = clickedArtists.includes(finalArtist) ? 'green' : 'yellow';
      }
    }
  
    // Update the tiles with the new track information
    setTiles((prevTiles) => {
      const newTiles = prevTiles.map((tile) => {
        if (tile.isInputTile && !tile.songInfo) {
          return {
            ...tile,
            iconSrc: track.album.images[0]?.url || 'default-image.png',
            songInfo: `${track.name} - ${clickedArtists.join(', ')}`,
            backgroundColor,
            isInputTile: false,
          };
        }
        return tile;
      });
  
      // Determine if a new input tile needs to be added
      const needsNewInputTile = !clickedArtists.includes(finalArtist) || !clickedArtists.includes(lastArtist);
  
      if (needsNewInputTile) {
        const finalArtistIndex = newTiles.findIndex(tile => tile.songInfo === finalArtist);
  
        if (finalArtistIndex > -1) {
          newTiles.splice(
            finalArtistIndex,
            0,
            {
              iconSrc:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
              songInfo: '',
              isInputTile: true,
            }
          );
        } else {
          newTiles.push({
            iconSrc:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
            songInfo: '',
            isInputTile: true,
          });
        }
      }
  
      return newTiles;
    });
  
    // Update lastArtist only if the background color is yellow
    if (backgroundColor === 'yellow' && clickedArtists.length > 1) {
      setLastArtist(clickedArtists[1]);
    }
  
    // Clear the search results after selection
    setTracks([]);
  };
  
  
  

  const handleInputChange = async (event) => {
    const query = event.target.value;
    const accessToken = await getAccessToken();

    if (query.length > 0) {
      const fetchedTracks = await searchTracks(query, accessToken);
      setTracks(fetchedTracks);
    } else {
      setTracks([]);
    }
  };

  return (
    <div id="tileholder">
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          iconSrc={tile.iconSrc}
          songInfo={tile.songInfo}
          isInputTile={tile.isInputTile}
          onSelect={handleSelect}
          handleInputChange={handleInputChange}
          tracks={tracks}
          backgroundColor={tile.backgroundColor}
        />
      ))}
    </div>
  );
};

export default TileHolder;
