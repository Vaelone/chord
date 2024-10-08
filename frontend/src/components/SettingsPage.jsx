import React from 'react';

const PlaceholderBox = () => {
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Content goes here */}
    </div>
  );
};

export default PlaceholderBox;
