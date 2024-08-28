import React from 'react';
import Tile from './Tile';

const InfoPage = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '45%',
      height: '80%',
      backgroundColor: 'white',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '14fr 9fr 32fr 9fr 9fr 9fr 9fr 9fr',
      padding: '20px',
    }}>
      <div id="title" style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', position: 'relative' }}>
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
      <div id="infoTiles" style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Tile 
          iconSrc="https://i.guim.co.uk/img/media/e0e27ceacf6271e6e4203c4a13287b9a6416828e/226_1394_2755_1653/master/2755.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fdaf920e5a2eefa5ea0cd987a65d002f" 
          songInfo="Ariana Grande" 
          style={{ width: '23.75%', height: '90%', fontSize: '10px' }} 
        />
        <Tile 
          iconSrc="https://i.scdn.co/image/ab67616d0000b2734bb9f35da9ff34b1e2314d8e" 
          songInfo="The Way - Ariana Grande ft. Mac Miller" 
          highlightedText="Mac Miller"
          style={{ width: '23.75%', height: '90%', fontSize: '10px' }} 
        />
        <Tile 
          iconSrc="https://i.scdn.co/image/ab67616d0000b273ee0f38410382a255e4fb15f4" 
          songInfo="Weekend - Mac Miller ft. Miguel" 
          highlightedText="Mac Miller"
          style={{ width: '23.75%', height: '90%', fontSize: '10px' }} 
        />
        <Tile 
          iconSrc="https://i.scdn.co/image/ab6761610000e5eb4669166b571594eade778990" 
          songInfo="Miguel" 
          style={{ width: '23.75%', height: '90%', fontSize: '10px' }} 
        />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        Each song must be made by one of the last song's features
      </div>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        Use as few songs as possible for a better score
      </div>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        Connect the artists with 6 or fewer songs to complete the puzzle
      </div>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        Red - Song was not created by a direct previous feature - it must be their song, they cannot be a feature artist
      </div>
      <div style={{ textAlign: 'center' }}>
        *Hidden features are no good - must be listed on the song itself
      </div>
    </div>
  );
};

export default InfoPage;
