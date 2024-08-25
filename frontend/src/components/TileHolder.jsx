import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import { getArtistImages, getAccessToken } from '../utils/spotify';
import { searchTracks } from '../utils/spotify';

const TileHolder = () => {
  const artist1 = "Drake";
  const artist2 = "Shawn Mendes";

  const [tiles, setTiles] = useState([
    {
      id: 1,
      iconSrc: '', // Initialize with empty string
      songInfo: artist1,
      isInputTile: false,
    },
    {
      id: 2,
      iconSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
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
  const [lastArtists, setLastArtists] = useState([artist1]); // Updated to an array
  const [finalArtist, setFinalArtist] = useState(artist2);
  const [gameComplete, setGameComplete] = useState(false); // New state to track game completion

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
  }, []);

  const handleSelect = async (track) => {
    if (gameComplete) return; // Exit if the game is complete
  
    const clickedArtists = track.artists.map((artist) => artist.name);
    let textColor = 'red'; 
    
    if (clickedArtists.length > 0) {
      if (lastArtists.includes(clickedArtists[0])) {
        textColor = clickedArtists.includes(finalArtist) ? 'green' : 'yellow';
      }
    }
  
    setTiles((prevTiles) => {
      const newTiles = prevTiles.map((tile) => {
        if (tile.isInputTile && !tile.songInfo) {
          return {
            ...tile,
            iconSrc: track.album.images[0]?.url || 'default-image.png',
            songInfo: `${track.name} - ${clickedArtists.join(', ')}`,
            textColor,
            isInputTile: false,
          };
        }
        return tile;
      });
  
      // Determine if we need to add a new input tile
      const needsNewInputTile = !clickedArtists.includes(finalArtist) || !lastArtists.some(artist => clickedArtists.includes(artist));
  
      // Add a new input tile if needed
      if (needsNewInputTile) {
        const existingInputTile = newTiles.find(tile => tile.isInputTile && !tile.songInfo);
        if (!existingInputTile) { // Only add a new input tile if one doesn't already exist
          const finalArtistIndex = newTiles.findIndex(tile => tile.songInfo === finalArtist);
          if (finalArtistIndex > -1) {
            newTiles.splice(finalArtistIndex, 0, {
              id: Date.now(), // Unique ID for new tile
              iconSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
              songInfo: '',
              isInputTile: true,
            });
          } else {
            newTiles.push({
              id: Date.now(), // Unique ID for new tile
              iconSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
              songInfo: '',
              isInputTile: true,
            });
          }
        }
      }
  
      // Mark game as complete if the correct condition is met
      if (textColor === 'green') {
        setGameComplete(true); // Set game as complete if both artists are found
      }
  
      // Update lastArtists
      if (textColor === 'yellow') {
        setLastArtists(clickedArtists);
      }
  
      return newTiles;
    });
  
    // Clear the search results after selection
    setTracks([]); // Reset the tracks state here
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
          key={tile.id} // Ensure each Tile has a unique key
          iconSrc={tile.iconSrc}
          songInfo={tile.songInfo}
          isInputTile={tile.isInputTile}
          onSelect={handleSelect}
          handleInputChange={handleInputChange}
          tracks={tracks}
          textColor={tile.textColor}
        />
      ))}
    </div>
  );
};

export default TileHolder;
