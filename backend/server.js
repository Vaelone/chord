const express = require('express');
const cors = require('cors');
const spotifyRoutes = require('./routes/spotify');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', spotifyRoutes);

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0'; // 

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
