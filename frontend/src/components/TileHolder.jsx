import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import { getArtistImages, getAccessToken } from '../utils/spotify';
import { searchTracks } from '../utils/spotify';
import { saveStatistics, getStatistics } from '../utils/localStorage';

const TileHolder = () => {
  const artist1 = "Drake";
  const artist2 = "Ariana Grande";

  const [tiles, setTiles] = useState([
    {
      id: 1,
      iconSrc: '', 
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
      iconSrc: '', 
      songInfo: artist2,
      isInputTile: false,
    },
  ]);

  const [tracks, setTracks] = useState([]);
  const [lastArtists, setLastArtists] = useState([artist1]);
  const [finalArtist, setFinalArtist] = useState(artist2);
  const [gameComplete, setGameComplete] = useState(false);
  const [displayUpwards, setDisplayUpwards] = useState(false);
  const [statistics, setStatistics] = useState(getStatistics() || { gamesPlayed: 0, wins: 0, guesses: [] });

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
    if (gameComplete) return;

    const clickedArtists = track.artists.map((artist) => artist.name);
    let textColor = 'red';

    if (clickedArtists.length > 0) {
      if (lastArtists.includes(clickedArtists[0])) {
        textColor = clickedArtists.includes(finalArtist) ? 'green' : 'yellow';
      }
    }

    setTiles((prevTiles) => {
      let newTiles = prevTiles.map((tile) => {
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

      const nonInputTilesCount = newTiles.filter(tile => !tile.isInputTile).length;

      if (nonInputTilesCount >= 5) {
        setDisplayUpwards(true);
      }

      const needsNewInputTile =
        !clickedArtists.includes(finalArtist) ||
        !lastArtists.some((artist) => clickedArtists.includes(artist));

      if (needsNewInputTile && nonInputTilesCount < 8) {
        const existingInputTile = newTiles.find(
          (tile) => tile.isInputTile && !tile.songInfo
        );
        if (!existingInputTile) {
          const finalArtistIndex = newTiles.findIndex(
            (tile) => tile.songInfo === finalArtist
          );
          if (finalArtistIndex > -1) {
            newTiles.splice(finalArtistIndex, 0, {
              id: Date.now(), 
              iconSrc:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
              songInfo: '',
              isInputTile: true,
            });
          } else {
            newTiles.push({
              id: Date.now(), 
              iconSrc:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
              songInfo: '',
              isInputTile: true,
            });
          }
        }
      }

      if (textColor === 'green' || nonInputTilesCount >= 8) {
        setGameComplete(true);

        const newStats = {
          ...statistics,
          gamesPlayed: statistics.gamesPlayed + 1,
          wins: textColor === 'green' ? statistics.wins + 1 : statistics.wins,
          guesses: [...statistics.guesses, nonInputTilesCount],
        };
        setStatistics(newStats);
        saveStatistics(newStats); // Save statistics to localStorage
      }

      if (textColor === 'yellow') {
        setLastArtists(clickedArtists);
      }

      return newTiles;
    });

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
          textColor={tile.textColor}
          displayUpwards={displayUpwards} 
        />
      ))}
    </div>
  );
};

export default TileHolder;
