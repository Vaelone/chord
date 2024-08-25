import axios from 'axios';

export async function getAccessToken() {
  const response = await axios.get('http://localhost:3001/api/token');
  return response.data.accessToken;
}

export async function searchTracks(query, accessToken) {
  const response = await axios.get('http://localhost:3001/api/search', {
    params: { query },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
}

export const getArtistImages = async (artistName) => {
  const response = await axios.get('http://localhost:3001/api/artist-images', {
    params: { artistName },
  });
  return response.data;
};
