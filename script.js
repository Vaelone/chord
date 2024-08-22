// Step 1: Get access token
lastartist = "Kanye West"
finalartist = "Rick Ross"
async function getAccessToken() {
    const clientId = '49c28caa0121477f90ce472ead0b8d65';
    const clientSecret = '1a4845aa02af424688d5ccb98b9a4dc6';
  
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      },
      body: 'grant_type=client_credentials',
    });
  
    const data = await response.json();
    return data.access_token;
  }
  
  // Step 2: Fetch tracks based on query
  async function searchTracks(query, accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  
    const data = await response.json();
    return data.tracks.items;
  }
  
  // Step 3: Handle input changes
  async function handleInputChange(event) {
    console.log("handleInputChange")
    const query = event.target.value;
    const accessToken = await getAccessToken();
  
    if (query.length > 0) {
      const tracks = await searchTracks(query, accessToken);
      displayResults(tracks);
    } else {
      clearResults();
    }
  }
  
  // Step 4: Display results in the DOM
  function displayResults(tracks) {
    const tile = document.getElementById('inputdiv');
    clearResults(); // Clear previous results
    finalArtists = []
    tracks.forEach(track => {
      const trackDiv = document.createElement('div');
      trackDiv.className = 'songsearch';

      const songicon = document.createElement('img');
      songicon.className = "searchicon";
      songicon.src = track.album.images[0]?.url || 'default-image.png'; // Fallback image if no image is available
      songicon.alt = `${track.name} cover`;

      const songtitle = document.createElement('div');
      songtitle.className = "searchtitle"
      songtitle.textContent = track.name;

      const artists = document.createElement('div');
      artists.className = "searchartist"
      artists.textContent = track.artists.map(artist => artist.name).join(', ');

      trackDiv.appendChild(songicon);
      trackDiv.appendChild(songtitle);
      trackDiv.appendChild(artists)
      trackDiv.addEventListener('click', () => {
        const targetTile = document.querySelector('.inputtile');
        const targetIcon = targetTile.querySelector('#icon');
        const infoDiv = targetTile.querySelector('#inputdiv');
        const clickedArtists = track.artists.map(artist => artist.name);
        targetIcon.src = songicon.src;
        infoDiv.textContent = `${track.name} - ${artists.textContent}`;
        targetTile.classList.remove('inputtile');
        infoDiv.removeAttribute("id");
        if(clickedArtists[0] != lastartist) {
            // make the background red or some shit, but still add another question tile
            infoDiv.style.backgroundColor = "red"
            addTile();
        } else if(clickedArtists.includes(finalartist)) {
                // This is the case that the user won
                infoDiv.style.backgroundColor = "green"
                // we will add some stuff to just exit all of the execution at this point
        } else {
            // because of the other two conditionals, we can only get to this spot if 
            // this is both the last artist's song, and final artist is not on it
            infoDiv.style.backgroundColor = "yellow"
            if(clickedArtists.length > 1) {
                lastartist = clickedArtists[1]
            }
            addTile();
        }       
      })
    //   trackDiv.textContent = `${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`;
    //   console.log(finalArtists);
      tile.appendChild(trackDiv);
      
    });
  }
  
  // Add in a new question tile if the recently inputted song is not a match
  function addTile() {
    const newTile = document.createElement('div');
    newTile.id = "tile";
    newTile.className = "inputtile"; // Make sure to match the previous tile class
    newTile.innerHTML = `
        <img id="icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png">
        <div id="inputdiv">
            <input id="guess" type="text">
        </div>
    `;
    
    // Insert the new tile before the tile containing finalartist
    const tileholder = document.getElementById('tileholder');
    const targetTile = Array.from(tileholder.children).find(child => 
        Array.from(child.querySelectorAll('*')).some(node => node.textContent.trim() === finalartist)
    );
    
    

    tileholder.insertBefore(newTile, targetTile);

    // Re-add the input event listener for the new input
    newTile.querySelector('#guess').addEventListener('input', handleInputChange);
  }

  // Clear results if input is empty
  function clearResults() {
    const tile = document.getElementById('inputdiv');
    const trackResults = tile.querySelectorAll('.songsearch');
    trackResults.forEach(result => result.remove());
  }
  
  // Step 5: Add event listener to input field
  document.querySelector('#inputdiv input').addEventListener('input', handleInputChange);
  
  
