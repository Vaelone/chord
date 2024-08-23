// src/components/TileHolder.jsx
import React, { useState } from 'react';
import Tile from './Tile';
import SearchResult from './SearchResult'; // Import if needed
import { getAccessToken, searchTracks } from '../utils/spotify';

const TileHolder = () => {
  const [tiles, setTiles] = useState([
    {
      id: 1,
      iconSrc:
        'https://static.dezeen.com/uploads/2016/08/kanye-west-ikea-collaboration-square_dezeen_936_0.jpg',
      songInfo: 'Kanye West',
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
      iconSrc:
        'https://hips.hearstapps.com/hmg-prod/images/2011-mtv-video-music-awards---arrivals.jpg',
      songInfo: 'Rick Ross',
      isInputTile: false,
    },
  ]);

  const [tracks, setTracks] = useState([]);
  const [lastArtist, setLastArtist] = useState("Kanye West");
  const [finalArtist, setFinalArtist] = useState("Rick Ross");

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
  
    setTiles((prevTiles) => {
      const newTiles = prevTiles.map((tile) => {
        if (tile.isInputTile && !tile.songInfo) {
          let backgroundColor = 'yellow';
  
          if (!clickedArtists.includes(lastArtist)) {
            backgroundColor = 'red';
          } else if (clickedArtists.includes(finalArtist)) {
            backgroundColor = 'green';
          } else {
            if (clickedArtists.length > 1) {
              setLastArtist(clickedArtists[1]);
            }
          }
  
          // Update the current tile with the selected track info
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
        // Find the index to insert the new input tile before the final artist tile
        const finalArtistIndex = newTiles.findIndex(tile => tile.songInfo === 'Rick Ross'); // Adjust as needed
  
        if (finalArtistIndex > -1) {
          newTiles.splice(
            finalArtistIndex, // Insert before the final artist tile
            0,
            {
              iconSrc:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
              songInfo: '',
              isInputTile: true,
            }
          );
        } else {
          // If finalArtist tile is not found, append the new input tile to the end
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
