// src/utils/spotify.js
export async function getAccessToken() {
    const clientId = '49c28caa0121477f90ce472ead0b8d65';
    const clientSecret = '1a4845aa02af424688d5ccb98b9a4dc6';
  
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      },
      body: 'grant_type=client_credentials',
    });
  
    const data = await response.json();
    return data.access_token;
  }
  
  export async function searchTracks(query, accessToken) {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  
    const data = await response.json();
    return data.tracks.items;
  }
  