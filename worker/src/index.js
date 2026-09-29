const ALLOWED_ORIGINS = [
    'https://playchord.app',
    'https://www.playchord.app',
    'https://playchord.vercel.app',
  ];
  
  const isAllowedOrigin = (origin) =>
    ALLOWED_ORIGINS.includes(origin) ||
    /^http:\/\/localhost(:\d+)?$/.test(origin) ||
    /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin);
  
  function corsHeaders(request) {
    const origin = request.headers.get('Origin');
    const headers = {
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    };
  
    if (origin && isAllowedOrigin(origin)) {
      headers['Access-Control-Allow-Origin'] = origin;
      headers['Access-Control-Allow-Credentials'] = 'true';
      headers['Vary'] = 'Origin';
    }
  
    return headers;
  }
  
  function json(data, request, status = 200) {
    return Response.json(data, { status, headers: corsHeaders(request) });
  }
  
  async function getAccessToken(env) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' + btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
    });
  
    if (!response.ok) throw new Error('token failed');
    const data = await response.json();
    return data.access_token;
  }
  
  export default {
    async fetch(request, env) {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders(request) });
      }
  
      const url = new URL(request.url);
  
      try {
        if (url.pathname === '/api/token') {
          return json({ accessToken: await getAccessToken(env) }, request);
        }
  
        if (url.pathname === '/api/search') {
          const query = url.searchParams.get('query') ?? '';
          const accessToken = await getAccessToken(env);
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          if (!response.ok) throw new Error('search failed');
          const data = await response.json();
          return json(data.tracks.items, request);
        }
  
        if (url.pathname === '/api/artist-images') {
          const artistName = url.searchParams.get('artistName') ?? '';
          const accessToken = await getAccessToken(env);
          const spotifyUrl = new URL('https://api.spotify.com/v1/search');
          spotifyUrl.searchParams.set('q', artistName);
          spotifyUrl.searchParams.set('type', 'artist');
          spotifyUrl.searchParams.set('limit', '1');
          const response = await fetch(spotifyUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (!response.ok) throw new Error('artist failed');
          const data = await response.json();
          const artist = data.artists?.items?.[0];
          return json(artist ? artist.images : [], request);
        }
  
        return json({ error: 'Not found' }, request, 404);
      } catch {
        const message =
          url.pathname === '/api/token'
            ? 'Failed to fetch access token'
            : url.pathname === '/api/search'
              ? 'Failed to search tracks'
              : 'Failed to fetch artist images';
        return json({ error: message }, request, 500);
      }
    },
  };