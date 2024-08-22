import React, { useState } from 'react';
import './app.css';

function App() {
  const [tiles, setTiles] = useState([
    {
      id: 1,
      artist: 'Kanye West',
      imgSrc: 'https://static.dezeen.com/uploads/2016/08/kanye-west-ikea-collaboration-square_dezeen_936_0.jpg',
    },
    {
      id: 2,
      artist: '',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png',
      isInputTile: true,
    },
    {
      id: 3,
      artist: 'Rick Ross',
      imgSrc: 'https://hips.hearstapps.com/hmg-prod/images/2011-mtv-video-music-awards---arrivals.jpg',
    }
  ]);

  const [lastArtist, setLastArtist] = useState('Kanye West');
  const [finalArtist] = useState('Rick Ross');

  async function getAccessToken() {
    const clientId = '49c28caa0121477f90ce472ead0b8d65';
    const clientSecret = '1a4845aa02af424688d5ccb
