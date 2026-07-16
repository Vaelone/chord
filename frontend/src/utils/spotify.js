import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export async function getAccessToken() {
  const response = await axios.get(`${API_BASE}/api/token`);
  return response.data.accessToken;
}

export async function searchTracks(query, accessToken) {
  const response = await axios.get(`${API_BASE}/api/search`, {
    params: { query },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
}

export const getArtistImages = async (artistName) => {
  const response = await axios.get(`${API_BASE}/api/artist-images`, {
    params: { artistName },
  });
  return response.data;
};
