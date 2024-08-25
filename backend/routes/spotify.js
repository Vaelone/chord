const express = require('express');
const router = express.Router();
const axios = require('axios');

const clientId = '49c28caa0121477f90ce472ead0b8d65';
const clientSecret = '1a4845aa02af424688d5ccb98b9a4dc6';

const getAccessToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    params: {
      grant_type: 'client_credentials',
    },
  });

  return response.data.access_token;
};

router.get('/token', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
});

router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data.tracks.items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search tracks' });
  }
});

router.get('/artist-images', async (req, res) => {
  const { artistName } = req.query;
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: artistName,
        type: 'artist',
        limit: 1,
      },
    });

    const artists = response.data.artists.items;
    if (artists.length > 0) {
      const artist = artists[0];
      res.json(artist.images);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artist images' });
  }
});

module.exports = router;
