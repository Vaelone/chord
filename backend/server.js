const express = require('express');
const cors = require('cors');
const spotifyRoutes = require('./routes/spotify');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', spotifyRoutes);

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // ✅ Add this

app.listen(PORT, HOST, () => {gigi
  console.log(`Server running at http://${HOST}:${PORT}`);
});
