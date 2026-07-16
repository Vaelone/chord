import React, { useState, useEffect, useRef } from 'react';
import Tile from './Tile';
import { getArtistImages, getAccessToken } from '../utils/spotify';
import { searchTracks } from '../utils/spotify';
import { saveStatistics, getStatistics } from '../utils/localStorage';
import StatsPage from './StatsPage';
import { getArtistForGenreAndEra } from '../utils/gameConfig';
import { getDisplaySongTitle } from '../utils/songTitle';

const PLACEHOLDER_ICON =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png';

const createInitialTiles = (startArtist, goalArtist, startIcon = '', goalIcon = '') => [
  {
    id: 1,
    iconSrc: startIcon,
    songInfo: startArtist,
    isInputTile: false,
    isStart: true,
  },
  {
    id: Date.now(),
    iconSrc: PLACEHOLDER_ICON,
    songInfo: '',
    isInputTile: true,
  },
  {
    id: 3,
    iconSrc: goalIcon,
    songInfo: goalArtist,
    isInputTile: false,
    isGoal: true,
  },
];

const computeRewind = (prevTiles, startArtist) => {
  const songEntries = prevTiles
    .map((tile, index) => ({ tile, index }))
    .filter(({ tile }) => tile.songTitle && !tile.isStart && !tile.isGoal);

  if (songEntries.length === 0) return null;

  const { index: removeIndex } = songEntries[songEntries.length - 1];
  let newTiles = prevTiles.filter((_, i) => i !== removeIndex);

  const hasInput = newTiles.some((tile) => tile.isInputTile && !tile.songTitle);
  if (!hasInput) {
    const goalIndex = newTiles.findIndex((tile) => tile.isGoal);
    newTiles.splice(goalIndex > -1 ? goalIndex : newTiles.length, 0, {
      id: Date.now(),
      iconSrc: PLACEHOLDER_ICON,
      songInfo: '',
      isInputTile: true,
    });
  }

  const songTiles = newTiles.filter(
    (tile) => tile.songTitle && !tile.isStart && !tile.isGoal
  );
  let lastArtists = [startArtist, startArtist];
  for (let i = songTiles.length - 1; i >= 0; i -= 1) {
    if (songTiles[i].linkStatus === 'valid' && songTiles[i].artists?.length) {
      lastArtists = songTiles[i].artists;
      break;
    }
  }

  const nonInputTilesCount = newTiles.filter((tile) => !tile.isInputTile).length;

  return {
    tiles: newTiles,
    lastArtists,
    displayUpwards: nonInputTilesCount >= 5,
  };
};

const TileHolder = ({ artist1Genre, artist1Era, artist2Genre, artist2Era, rewindSignal = 0 }) => {
  useEffect(() => {
    const setDimensions = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      const headerElement = document.getElementById('titleholder');
      const headerHeight = headerElement?.offsetHeight ?? 72;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

      const isPortraitMobile = vw < 700 || vw / vh < 0.75;
      const COLS = isPortraitMobile ? 2 : 4;
      const ROWS = isPortraitMobile ? 4 : 2;

      const padX = Math.min(vw * 0.025, 28);
      const padY = Math.min(vh * 0.02, 16);
      const gap = Math.min(vw * 0.012, 16);

      const availableW = vw - 2 * padX - (COLS - 1) * gap;
      const tileWidth = availableW / COLS;

      const availableH = vh - headerHeight - 2 * padY - (ROWS - 1) * gap;
      const rowHeight = availableH / ROWS;
      const labelSpace = isPortraitMobile ? 72 : 88;
      const photoFromHeight = rowHeight - labelSpace;
      const photoSize = Math.floor(Math.min(tileWidth, photoFromHeight));

      document.documentElement.style.setProperty('--tile-gap', `${gap}px`);
      document.documentElement.style.setProperty('--tile-pad-x', `${padX}px`);
      document.documentElement.style.setProperty('--tile-pad-y', `${padY}px`);
      document.documentElement.style.setProperty('--tile-photo-size', `${Math.max(photoSize, 48)}px`);
      document.documentElement.style.setProperty('--tile-width', `${tileWidth}px`);
      document.documentElement.style.setProperty('--tile-font-size', `${Math.max(11, Math.min(18, photoSize * 0.085))}px`);
      document.documentElement.dataset.gridLayout = isPortraitMobile ? 'portrait' : 'desktop';

      if (headerElement) {
        const isCompactHeader = vw <= 1600;
        const brandWidth =
          headerElement.querySelector('.header-brand')?.offsetWidth ?? 0;
        const headerActionsWidth =
          headerElement.querySelector('.header-actions')?.offsetWidth ?? 0;
        const headerGap =
          Number.parseFloat(getComputedStyle(headerElement).gap) || 12;
        const clusterMaxWidth = Math.max(
          0,
          headerElement.clientWidth - brandWidth - headerActionsWidth - headerGap * 2
        );

        const clusterEl =
          headerElement.querySelector('.filter-cluster') ??
          headerElement.querySelector('.header-filters');
        const filterActionsEl = clusterEl?.querySelector('.filter-actions');

        if (clusterEl) {
          const actionsWidth =
            filterActionsEl?.offsetWidth ??
            (isCompactHeader ? 148 : 180);
          const labelSpace = Array.from(
            clusterEl.querySelectorAll('.filter-group-label')
          ).reduce((total, label) => total + label.offsetWidth, 0);

          const dividerCount =
            clusterEl.querySelectorAll('.filter-divider').length;
          const clusterGap =
            Number.parseFloat(getComputedStyle(clusterEl).gap) ||
            (isCompactHeader ? 8 : 12);
          const dividerSpace = dividerCount * 9;
          const internalGaps = clusterGap * (dividerCount + 3);

          const availableForDropdowns =
            clusterMaxWidth - labelSpace - dividerSpace - actionsWidth - internalGaps;
          const dropdownWidth = Math.floor(availableForDropdowns / 4);
          const maxDropdown = isCompactHeader ? 148 : 195;
          const minDropdown = isCompactHeader ? 52 : 64;
          const clampedDropdown = Math.max(
            minDropdown,
            Math.min(maxDropdown, dropdownWidth)
          );
          const dropdownFont = Math.max(
            0.58,
            Math.min(isCompactHeader ? 0.92 : 1.17, clampedDropdown / 167)
          );
          const actionFont = Math.max(0.62, Math.min(0.95, dropdownFont * 0.92));

          document.documentElement.style.setProperty(
            '--header-dropdown-width',
            `${clampedDropdown}px`
          );
          document.documentElement.style.setProperty(
            '--header-dropdown-font',
            `${dropdownFont}rem`
          );
          document.documentElement.style.setProperty(
            '--header-label-font',
            `${Math.max(0.55, Math.min(0.95, dropdownFont * 0.88))}rem`
          );
          document.documentElement.style.setProperty(
            '--header-action-font',
            `${actionFont}rem`
          );
          document.documentElement.style.setProperty(
            '--header-action-pad-x',
            isCompactHeader ? '12px' : '20px'
          );
          document.documentElement.style.setProperty(
            '--header-icon-size',
            isCompactHeader ? '38px' : '48px'
          );
          document.documentElement.dataset.headerLayout = isCompactHeader
            ? 'compact'
            : 'comfortable';
        }
      }

      window.dispatchEvent(new CustomEvent('chord-layout-update'));
    };

    setDimensions();
    requestAnimationFrame(setDimensions);

    window.addEventListener('resize', setDimensions);
    window.addEventListener('orientationchange', setDimensions);
    document.addEventListener('visibilitychange', setDimensions);

    const headerElement = document.getElementById('titleholder');
    const clusterElement = headerElement?.querySelector('.filter-cluster');
    const filterActionsElement = clusterElement?.querySelector('.filter-actions');
    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(setDimensions)
        : null;
    if (headerElement) resizeObserver?.observe(headerElement);
    if (clusterElement) resizeObserver?.observe(clusterElement);
    if (filterActionsElement) resizeObserver?.observe(filterActionsElement);

    return () => {
      window.removeEventListener('resize', setDimensions);
      window.removeEventListener('orientationchange', setDimensions);
      document.removeEventListener('visibilitychange', setDimensions);
      resizeObserver?.disconnect();
    };
  }, []);

  const [[startArtist, goalArtist]] = useState(() => {
    const start = getArtistForGenreAndEra(artist1Genre, artist1Era);
    const goal = getArtistForGenreAndEra(artist2Genre, artist2Era, [start]);
    return [start, goal];
  });

  const [tiles, setTiles] = useState(() =>
    createInitialTiles(startArtist, goalArtist)
  );

  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noMatchHint, setNoMatchHint] = useState(false);
  const searchGenerationRef = useRef(0);
  const [lastArtists, setLastArtists] = useState([startArtist, startArtist]);
  const finalArtist = goalArtist;
  const [gameComplete, setGameComplete] = useState(false);
  const [displayUpwards, setDisplayUpwards] = useState(false);
  const [statistics, setStatistics] = useState(getStatistics() || { gamesPlayed: 0, wins: 0, guesses: [] });
  const [showStatsPage, setShowStatsPage] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const artist1Images = await getArtistImages(startArtist);
      const artist2Images = await getArtistImages(goalArtist);

      setTiles((prevTiles) => prevTiles.map((tile) => {
        if (tile.isStart) {
          return {
            ...tile,
            iconSrc: artist1Images[0]?.url || 'default-image.png',
          };
        }
        if (tile.isGoal) {
          return {
            ...tile,
            iconSrc: artist2Images[0]?.url || 'default-image.png',
          };
        }
        return tile;
      }));
    };

    fetchImages();
  }, [startArtist, goalArtist]);

  useEffect(() => {
    if (!rewindSignal) return;

    setTiles((prevTiles) => {
      const result = computeRewind(prevTiles, startArtist);
      if (!result) return prevTiles;

      setLastArtists(result.lastArtists);
      setDisplayUpwards(result.displayUpwards);
      setGameComplete(false);
      setShowStatsPage(false);
      searchGenerationRef.current += 1;
      setSearchQuery('');
      setTracks([]);
      setNoMatchHint(false);

      return result.tiles;
    });
  }, [rewindSignal, startArtist]);

  const handleSelect = async (track) => {
    if (gameComplete) return;

    searchGenerationRef.current += 1;
    setSearchQuery('');
    setTracks([]);
    setNoMatchHint(false);

    const clickedArtists = track.artists.map((artist) => artist.name);
    let isValidLink = false;
    if (clickedArtists.length > 0) {
      if (lastArtists.length === 1) {
        isValidLink = lastArtists[0] === clickedArtists[0];
      } else {
        isValidLink = lastArtists.slice(1).includes(clickedArtists[0]);
      }
    }

    const reachedGoal = isValidLink && clickedArtists.includes(finalArtist);
    const linkStatus = isValidLink ? 'valid' : 'invalid';

    setTiles((prevTiles) => {
      let newTiles = prevTiles.map((tile) => {
        if (tile.isInputTile && !tile.songInfo) {
          return {
            ...tile,
            iconSrc: track.album.images[0]?.url || 'default-image.png',
            songTitle: getDisplaySongTitle(track.name, clickedArtists),
            artists: clickedArtists,
            connectingArtist: isValidLink ? clickedArtists[0] : undefined,
            linkStatus,
            isInputTile: false,
          };
        }
        return tile;
      });

      const nonInputTilesCount = newTiles.filter(tile => !tile.isInputTile).length;

      if (nonInputTilesCount >= 5) {
        setDisplayUpwards(true);
      }

      if (!reachedGoal && nonInputTilesCount < 8) {
        const existingInputTile = newTiles.find(
          (tile) => tile.isInputTile && !tile.songInfo
        );
        if (!existingInputTile) {
          const goalIndex = newTiles.findIndex((tile) => tile.isGoal);
          const insertIndex = goalIndex > -1 ? goalIndex : newTiles.length;
          newTiles.splice(insertIndex, 0, {
            id: Date.now(),
            iconSrc: PLACEHOLDER_ICON,
            songInfo: '',
            isInputTile: true,
          });
        }
      }

      if (reachedGoal || nonInputTilesCount >= 8) {
        setGameComplete(true);

        const newStats = {
          ...statistics,
          gamesPlayed: statistics.gamesPlayed + 1,
          wins: reachedGoal ? statistics.wins + 1 : statistics.wins,
          guesses: [...statistics.guesses, nonInputTilesCount],
          lastRun: {
            won: reachedGoal,
            tileCount: nonInputTilesCount,
          },
        };
        setStatistics(newStats);
        saveStatistics(newStats);

        setShowStatsPage(true);
      }

      if (isValidLink) {
        setLastArtists(clickedArtists);
      }

      return newTiles;
    });
  };

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length === 0) {
      setTracks([]);
      setNoMatchHint(false);
      return;
    }

    const generation = ++searchGenerationRef.current;

    try {
      const accessToken = await getAccessToken();

      if (generation !== searchGenerationRef.current) return;

      const fetchedTracks = await searchTracks(query, accessToken);

      if (generation !== searchGenerationRef.current) return;

      const filteredTracks = fetchedTracks.filter(track =>
        track.artists.some(artist =>
          lastArtists.some(lastArtist =>
            artist.name.toLowerCase() === lastArtist.toLowerCase()
          )
        )
      );

      setTracks(filteredTracks);
      setNoMatchHint(
        query.trim().length > 0 &&
          fetchedTracks.length > 0 &&
          filteredTracks.length === 0
      );
    } catch (error) {
      if (generation !== searchGenerationRef.current) return;
      console.error('Song search failed:', error);
      setTracks([]);
      setNoMatchHint(false);
    }
  };

  const currentArtistLabel = [...new Set(lastArtists)].join(', ');

  return (
    <div id="tileholder">
      {(() => {
        let songStep = 0;
        return tiles.map((tile) => {
          const isActiveInput = tile.isInputTile && !tile.songTitle;
          let tileMarker = null;
          if (tile.isStart) {
            tileMarker = 'start';
          } else if (tile.isGoal) {
            tileMarker = 'goal';
          } else if (tile.songTitle) {
            tileMarker = ++songStep;
          }

          return (
            <Tile
              key={tile.id}
              iconSrc={tile.iconSrc}
              songInfo={tile.songInfo}
              songTitle={tile.songTitle}
              artists={tile.artists}
              connectingArtist={tile.connectingArtist}
              isInputTile={tile.isInputTile}
              onSelect={handleSelect}
              handleInputChange={handleInputChange}
              inputValue={isActiveInput ? searchQuery : ''}
              tracks={isActiveInput ? tracks : []}
              noMatchHint={isActiveInput ? noMatchHint : false}
              currentArtistLabel={currentArtistLabel}
              linkStatus={tile.linkStatus}
              tileMarker={tileMarker}
              displayUpwards={displayUpwards}
            />
          );
        });
      })()}
      {showStatsPage && <StatsPage onClose={() => setShowStatsPage(false)} />}
    </div>
  );
};

export default TileHolder;