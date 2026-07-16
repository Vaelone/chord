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

export const DEFAULT_START_GENRES = ['Pop'];
export const DEFAULT_START_ERAS = ['2010s', '2020s'];
export const DEFAULT_GOAL_GENRES = ['Hip Hop'];
export const DEFAULT_GOAL_ERAS = ['2010s', '2020s'];

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

// Build the artist pool for selected genres and eras
export const buildArtistPool = (selectedGenres, selectedEras) => {
  const genres = selectedGenres.length === 0 ? GENRES : selectedGenres;
  const eras = selectedEras.length === 0 ? ERAS : selectedEras;

  let finalPool = [];

  for (const genre of genres) {
    const genrePool = ARTIST_POOLS[genre];
    if (!genrePool) continue;

    for (const era of eras) {
      const eraArtists = genrePool[era];
      if (eraArtists) {
        finalPool = finalPool.concat(eraArtists);
      }
    }
  }

  return [...new Set(finalPool)];
};

export const getArtistForGenreAndEra = (selectedGenres, selectedEras, exclude = []) => {
  const excluded = new Set(exclude);
  let pool = buildArtistPool(selectedGenres, selectedEras).filter(
    (artist) => !excluded.has(artist)
  );

  // If the filtered pool is empty, widen to all artists (still excluding matches)
  if (pool.length === 0) {
    pool = buildArtistPool(GENRES, ERAS).filter((artist) => !excluded.has(artist));
  }

  if (pool.length === 0) return 'Unknown Artist';

  return pool[Math.floor(Math.random() * pool.length)];
};