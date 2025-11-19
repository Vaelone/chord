import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import { getArtistImages, getAccessToken } from '../utils/spotify';
import { searchTracks } from '../utils/spotify';
import { saveStatistics, getStatistics } from '../utils/localStorage';
import StatsPage from './StatsPage';
import { getArtistForGenreAndEra } from '../utils/gameConfig';

const TileHolder = ({ artist1Genre, artist1Era, artist2Genre, artist2Era }) => {
  useEffect(() => {
    const setDimensions = () => {
      // Set viewport height
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Set header height
      const headerElement = document.getElementById('titleholder');
      if (headerElement) {
        const headerHeight = headerElement.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      }
    };
  
    setDimensions();
    
    window.addEventListener('resize', setDimensions);
    window.addEventListener('orientationchange', setDimensions);
    window.addEventListener('scroll', setDimensions);
    document.addEventListener('visibilitychange', setDimensions);
  
    return () => {
      window.removeEventListener('resize', setDimensions);
      window.removeEventListener('orientationchange', setDimensions);
      window.removeEventListener('scroll', setDimensions);
      document.removeEventListener('visibilitychange', setDimensions);
    };
  }, []);

  const artist1 = getArtistForGenreAndEra(artist1Genre, artist1Era);
  const artist2 = getArtistForGenreAndEra(artist2Genre, artist2Era);

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
  const [lastArtists, setLastArtists] = useState([artist1, artist1]);
  // const [finalArtist, setFinalArtist] = useState(artist2);
  const finalArtist = artist2;
  const [gameComplete, setGameComplete] = useState(false);
  const [displayUpwards, setDisplayUpwards] = useState(false);
  const [statistics, setStatistics] = useState(getStatistics() || { gamesPlayed: 0, wins: 0, guesses: [] });
  const [showStatsPage, setShowStatsPage] = useState(false);

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
      if(lastArtists.length == 1){
        if (lastArtists[0] == clickedArtists[0]) {
          textColor = clickedArtists.includes(finalArtist) ? 'green' : 'yellow';
        }
      } else{
        if (lastArtists.slice(1).includes(clickedArtists[0])) {
          textColor = clickedArtists.includes(finalArtist) ? 'green' : 'yellow';
        }
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
        (!clickedArtists.includes(finalArtist) || textColor == 'red' || textColor == 'yellow')||
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

        setShowStatsPage(true); // Trigger StatsPage to show after the game is complete
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
      
      // Filter tracks to only show songs by the current connecting artist(s)
      const currentArtist = lastArtists.length === 1 ? lastArtists[0] : lastArtists[lastArtists.length - 1];
      
      const filteredTracks = fetchedTracks.filter(track => 
        track.artists.some(artist => 
          lastArtists.some(lastArtist => 
            artist.name.toLowerCase() === lastArtist.toLowerCase()
          )
        )
      );
      
      setTracks(filteredTracks);
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
      {showStatsPage && <StatsPage onClose={() => setShowStatsPage(false)} />} {/* Show StatsPage after the game is complete */}
    </div>
  );
};

export default TileHolder;