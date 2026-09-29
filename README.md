# Chord

Link two artists through real songs. You get a start artist and a goal artist, and you build a chain of Spotify tracks until the goal shows up.

Play at [playchord.app](https://playchord.app).

## How to play

Spotify lists one artist first on every track. That is the main artist, and it is the only credit that counts.

- The first song's main artist must be the start artist.
- Each later song's main artist must be someone credited on the previous song.
- Reach the goal artist in six songs or fewer.
- A feature only counts if Spotify lists that artist on the track.

Shuffle picks a new start and goal from the genre and era filters. Rewind removes the last song. Stats stay in the browser.

## Project layout

| Piece | What it does |
| --- | --- |
| `frontend/` | React app. The puzzle, filters, and stats all run here. |
| `worker/` | Cloudflare Worker. It holds the Spotify app credentials and proxies search and artist photos. |
| `backend/` | The old Express server. The live site no longer calls it. |

The browser never talks to Spotify directly. In production it calls `https://chord.vaelone-elankumaran-6cc.workers.dev`. Locally, Vite proxies `/api` to that same Worker.

## Run it locally

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints. Artist photos and search go through the deployed Worker, so you do not need a local API process.

`npm run dev` inside `worker/` needs the local Workers runtime, which requires macOS 13.5 or newer. On an older Mac, deploy and curl the workers.dev URL instead.

## Deploy the API

From `worker/`, after `npx wrangler login`:

```bash
npx wrangler secret put SPOTIFY_CLIENT_ID
npx wrangler secret put SPOTIFY_CLIENT_SECRET
npx wrangler deploy
```

Put the same values in `worker/.dev.vars` for local use. That file is gitignored.

The frontend is deployed on Vercel from `main`. `VITE_API_BASE_URL` overrides the Worker URL if it is set in the Vercel project.
