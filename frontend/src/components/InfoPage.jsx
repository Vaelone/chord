import React from 'react';
import Tile from './Tile';

const InfoPage = ({ onClose }) => {
  return (
    <div id="popup" className="infoPage">
      <div className="infoTitle"  style={{ textAlign: 'center', fontWeight: 'bold', position: 'relative' }}>
        How to Play
        <span 
          onClick={onClose} 
          style={{ 
            position: 'absolute', 
            right: 0, 
            top: 0, 
            cursor: 'pointer', 
            padding: '5px' 
          }}
        >
          ❌
        </span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        Link artists using a "Chord" of songs
      </div>
      <div id="infoTiles">
        <Tile 
          iconSrc="https://i.guim.co.uk/img/media/e0e27ceacf6271e6e4203c4a13287b9a6416828e/226_1394_2755_1653/master/2755.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fdaf920e5a2eefa5ea0cd987a65d002f" 
          songInfo="Ariana Grande" 
          className="tile-medium" // Pass the className prop
        />
        <Tile 
          iconSrc="https://i.scdn.co/image/ab67616d0000b2734bb9f35da9ff34b1e2314d8e" 
          songInfo="The Way - Ariana Grande ft. Mac Miller" 
          highlightedText="Mac Miller"
          className="tile-medium" // Pass the className prop
        />
        <Tile 
          iconSrc="https://i.scdn.co/image/ab67616d0000b273ee0f38410382a255e4fb15f4" 
          songInfo="Weekend - Mac Miller ft. Miguel" 
          highlightedText="Mac Miller"
          className="tile-medium" // Pass the className prop
        />
        <Tile 
          iconSrc="https://i.scdn.co/image/ab6761610000e5eb4669166b571594eade778990" 
          songInfo="Miguel" 
          className="tile-medium" // Pass the className prop
        />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        Each song must be made by one of the last song's features
      </div>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        Red - None of the previous features are this song's primary artist
      </div>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        Connect the artists with 6 or less songs, using as few as possible
      </div>
      <div style={{ textAlign: 'center' }}>
        *Hidden features do not work - must be listed as an artist
      </div>
    </div>
  );
};

export default InfoPage;
