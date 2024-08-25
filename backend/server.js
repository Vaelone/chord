const express = require('express');
const cors = require('cors');
const spotifyRoutes = require('./routes/spotify');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', spotifyRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
