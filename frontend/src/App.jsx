import React, { useState } from 'react';
import TileHolder from './components/TileHolder';
import Title from './components/Title';
import ViewportNotice from './components/ViewportNotice';
import { DEFAULT_START_GENRES, DEFAULT_START_ERAS, DEFAULT_GOAL_GENRES, DEFAULT_GOAL_ERAS } from './utils/gameConfig';

const App = () => {
  const [artist1Genre, setArtist1Genre] = useState([...DEFAULT_START_GENRES]);
  const [artist1Era, setArtist1Era] = useState([...DEFAULT_START_ERAS]);
  const [artist2Genre, setArtist2Genre] = useState([...DEFAULT_GOAL_GENRES]);
  const [artist2Era, setArtist2Era] = useState([...DEFAULT_GOAL_ERAS]);
  const [gameKey, setGameKey] = useState(0);
  const [rewindSignal, setRewindSignal] = useState(0);

  const handleShuffle = () => {
    setGameKey((prev) => prev + 1);
  };

  const handleRewind = () => {
    setRewindSignal((prev) => prev + 1);
  };

  return (
    <>
      <ViewportNotice />
      <div id="overall">
      <Title 
        artist1Genre={artist1Genre}
        setArtist1Genre={setArtist1Genre}
        artist1Era={artist1Era}
        setArtist1Era={setArtist1Era}
        artist2Genre={artist2Genre}
        setArtist2Genre={setArtist2Genre}
        artist2Era={artist2Era}
        setArtist2Era={setArtist2Era}
        onShuffle={handleShuffle}
        onRewind={handleRewind}
      />
      <TileHolder 
        key={gameKey}
        rewindSignal={rewindSignal}
        artist1Genre={artist1Genre}
        artist1Era={artist1Era}
        artist2Genre={artist2Genre}
        artist2Era={artist2Era}
      />
      </div>
    </>
  );
};

export default App;