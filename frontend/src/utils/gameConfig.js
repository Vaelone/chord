export const GENRES = [
  'Hip Hop',
  'Pop',
  'R&B',
  'Country'
];

export const ERAS = [
  '1990s',
  '2000s',
  '2010s',
  '2020s'
];

export const ARTIST_POOLS = {
  'Hip Hop': {
    '1990s': ['Tupac', 'The Notorious B.I.G.', 'Nas', 'Jay-Z', 'Dr. Dre', 'Snoop Dogg', 'Wu-Tang Clan', 'Ice Cube', 'Outkast', 'DMX'],
    '2000s': ['Kanye West', '50 Cent', 'Eminem', 'Lil Wayne', 'Jay-Z', 'T.I.', 'Ludacris', 'The Game', 'Nelly', 'Outkast'],
    '2010s': ['Drake', 'Kendrick Lamar', 'J. Cole', 'Nicki Minaj', 'Future', 'Kanye West', 'Travis Scott', 'A$AP Rocky', 'Childish Gambino', 'Migos'],
    '2020s': ['Lil Baby', 'Travis Scott', 'Doja Cat', 'Playboi Carti', 'Jack Harlow', 'Gunna', 'Ice Spice', 'Baby Keem', 'Lil Durk', 'Roddy Ricch']
  },

  'Pop': {
    '1990s': ['Britney Spears', 'Backstreet Boys', 'NSYNC', 'Mariah Carey', 'Whitney Houston', 'Madonna', 'Janet Jackson', 'Christina Aguilera', 'Celine Dion', 'Spice Girls'],
    '2000s': ['Rihanna', 'Justin Timberlake', 'Beyoncé', 'Britney Spears', 'Christina Aguilera', 'Usher', 'P!nk', 'Kelly Clarkson', 'Gwen Stefani', 'Jennifer Lopez'],
    '2010s': ['Taylor Swift', 'Ariana Grande', 'Justin Bieber', 'Bruno Mars', 'The Weeknd', 'Katy Perry', 'Ed Sheeran', 'Lady Gaga', 'Dua Lipa', 'Selena Gomez'],
    '2020s': ['Olivia Rodrigo', 'Sabrina Carpenter', 'The Weeknd', 'Dua Lipa', 'Billie Eilish', 'Doja Cat', 'Tate McRae', 'SZA', 'Ariana Grande', 'Chappell Roan']
  },

  'R&B': {
    '1990s': ['Whitney Houston', 'Mariah Carey', 'Boyz II Men', 'TLC', 'Aaliyah', 'R. Kelly', 'Lauryn Hill', 'Toni Braxton', 'Maxwell', 'Mary J. Blige'],
    '2000s': ['Usher', 'Alicia Keys', 'Beyoncé', 'Chris Brown', 'Ne-Yo', 'Mary J. Blige', 'Rihanna', 'Ciara', 'Mario', 'Trey Songz'],
    '2010s': ['The Weeknd', 'Frank Ocean', 'Miguel', 'SZA', 'Beyoncé', 'Bruno Mars', 'Trey Songz', 'Jhene Aiko', 'PARTYNEXTDOOR', 'Alicia Keys'],
    '2020s': ['SZA', 'The Weeknd', 'Summer Walker', 'Brent Faiyaz', 'Giveon', 'Chloe Bailey', 'Victoria Monét', 'Khalid', 'Ella Mai', 'Daniel Caesar']
  },

  'Country': {
    '1990s': ['Garth Brooks', 'Shania Twain', 'George Strait', 'Alan Jackson', 'Tim McGraw', 'Faith Hill', 'Brooks & Dunn', 'Reba McEntire', 'Dixie Chicks', 'Kenny Chesney'],
    '2000s': ['Carrie Underwood', 'Taylor Swift', 'Keith Urban', 'Kenny Chesney', 'Rascal Flatts', 'Brad Paisley', 'Zac Brown Band', 'Jason Aldean', 'Tim McGraw', 'Miranda Lambert'],
    '2010s': ['Luke Bryan', 'Florida Georgia Line', 'Chris Stapleton', 'Kacey Musgraves', 'Eric Church', 'Blake Shelton', 'Thomas Rhett', 'Miranda Lambert', 'Sam Hunt', 'Jason Aldean'],
    '2020s': ['Morgan Wallen', 'Luke Combs', 'Zach Bryan', 'Lainey Wilson', 'Kacey Musgraves', 'Jelly Roll', 'Hardy', 'Cody Johnson', 'Bailey Zimmerman', 'Parker McCollum']
  }
};

// Helper: flatten an array of arrays
const flatten = arr => arr.reduce((a, b) => a.concat(b), []);

// Updated to work with arrays of selected genres and eras
export const getArtistForGenreAndEra = (selectedGenres, selectedEras) => {
  // Handle empty selections - default to all
  const genres = selectedGenres.length === 0 ? GENRES : selectedGenres;
  const eras = selectedEras.length === 0 ? ERAS : selectedEras;

  let finalPool = [];

  // Iterate through all selected genres
  for (const genre of genres) {
    const genrePool = ARTIST_POOLS[genre];
    if (!genrePool) continue;

    // Iterate through all selected eras
    for (const era of eras) {
      const eraArtists = genrePool[era];
      if (eraArtists) {
        finalPool = finalPool.concat(eraArtists);
      }
    }
  }

  // Remove duplicates (some artists appear in multiple eras/genres)
  finalPool = [...new Set(finalPool)];

  if (finalPool.length === 0) return 'Unknown Artist';

  return finalPool[Math.floor(Math.random() * finalPool.length)];
};