const express = require('express');
const cors = require('cors');
const spotifyRoutes = require('./routes/spotify');

const app = express();

// CORS configuration
const allowedOrigins = [
  'https://playchord.app',
  'https://www.playchord.app',
  'https://playchord.vercel.app',
];

const isLocalDevOrigin = (origin) =>
  /^http:\/\/localhost(:\d+)?$/.test(origin) ||
  /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin);

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (isLocalDevOrigin(origin) || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Deny without throwing — an Error here becomes a 500 with no CORS headers,
    // which browsers report as "No 'Access-Control-Allow-Origin' header".
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());
app.use('/api', spotifyRoutes);

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

