import React, { useState } from 'react';
import SearchResult from './components/SearchResult';
import { getAccessToken, searchTracks } from './utils/spotify';
const App = () => {
    const [tracks, setTracks] = useState([]);
    const [lastArtist, setLastArtist] = useState("Kanye West");
    const [finalArtist, setFinalArtist] = useState("Rick Ross");

    const handleSelect = (track) => {
        const targetTile = document.querySelector('.inputtile');
        const targetIcon = targetTile.querySelector('#icon');
        const infoDiv = targetTile.querySelector('#inputdiv');
        const clickedArtists = track.artists.map(artist => artist.name);
        targetIcon.src = track.album.images[0]?.url || 'default-image.png';
        infoDiv.textContent = `${track.name} - ${clickedArtists.join(', ')}`;
        targetTile.classList.remove('inputtile');
        infoDiv.removeAttribute("id");

        if (clickedArtists[0] !== lastArtist) {
            infoDiv.style.backgroundColor = "red";
            addTile();
        } else if (clickedArtists.includes(finalArtist)) {
            infoDiv.style.backgroundColor = "green";
        } else {
            infoDiv.style.backgroundColor = "yellow";
            if (clickedArtists.length > 1) {
                setLastArtist(clickedArtists[1]);
            }
            addTile();
        }
    };

    const handleInputChange = async (event) => {
        const query = event.target.value;
        const accessToken = await getAccessToken();

        if (query.length > 0) {
            const tracks = await searchTracks(query, accessToken);
            setTracks(tracks);
        } else {
            clearResults();
        }
    };

    const clearResults = () => {
        setTracks([]);
    };

    return (
        <div id="overall">
            <div id="titleholder">
                <h1 id="title">Chord</h1>
            </div>
            <div id="tileholder">
              <div id="tile" className="artist-tile">
                <img id="icon" src="https://static.dezeen.com/uploads/2016/08/kanye-west-ikea-collaboration-square_dezeen_936_0.jpg" alt="Kanye West" />
                <div id="songInfo">Kanye West</div>
              </div>
              <div id="tile" className="inputtile">
                  <img id="icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png" alt="Question mark" />
                  <div id="inputdiv">
                      <input id="guess" type="text" onInput={handleInputChange} />
                      {tracks.map(track => (
                          <SearchResult key={track.id} track={track} onSelect={handleSelect} />
                      ))}
                  </div>
              </div>
              <div id="tile" className="artist-tile">
                <img id="icon" src="https://hips.hearstapps.com/hmg-prod/images/2011-mtv-video-music-awards---arrivals.jpg" alt="Rick Ross" />
                <div id="songInfo">Rick Ross</div>
              </div>
            </div>
        </div>
    );
};

export default App;
 