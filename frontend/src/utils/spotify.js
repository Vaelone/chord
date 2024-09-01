import axios from 'axios';

export async function getAccessToken() {
  const response = await axios.get('https://chord-nkwz.onrender.com/api/token');
  return response.data.accessToken;
}

export async function searchTracks(query, accessToken) {
  const response = await axios.get('https://chord-nkwz.onrender.com/api/search', {
    params: { query },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
}

export const getArtistImages = async (artistName) => {
  const response = await axios.get('https://chord-nkwz.onrender.com/api/artist-images', {
    params: { artistName },
  });
  return response.data;
};
