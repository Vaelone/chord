// src/App.jsx
import React from 'react';
import TileHolder from './components/TileHolder';
import Title from './components/Title';

const App = () => {
  return (
    <div id="overall">
      <Title />
      <TileHolder />
    </div>
  );
};

export default App;
