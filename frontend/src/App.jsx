import React, { useState } from 'react';
import TileHolder from './components/TileHolder';
import Title from './components/Title';
import { GENRES, ERAS } from './utils/gameConfig';

const App = () => {
  const [artist1Genre, setArtist1Genre] = useState([...GENRES]); // Start with all selected
  const [artist1Era, setArtist1Era] = useState([...ERAS]);
  const [artist2Genre, setArtist2Genre] = useState([...GENRES]);
  const [artist2Era, setArtist2Era] = useState([...ERAS]);
  const [gameKey, setGameKey] = useState(0);

  const handleRefresh = () => {
    setGameKey(prev => prev + 1);
  };

  return (
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
        onRefresh={handleRefresh}
      />
      <TileHolder 
        key={gameKey}
        artist1Genre={artist1Genre}
        artist1Era={artist1Era}
        artist2Genre={artist2Genre}
        artist2Era={artist2Era}
      />
    </div>
  );
};

export default App;