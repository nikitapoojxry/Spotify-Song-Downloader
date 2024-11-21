import React from "react"
import { SlSocialSpotify } from "react-icons/sl";
import axios from "axios"
import { useState } from "react";
import './App.css'; // Ensure you import the CSS file

function App() {
  const [URL, setURL] = useState("")

  const handleURL = (e) => {
    e.preventDefault()
    setURL(e.target.value)
  }

  console.log(URL)

  const downloadSong = async () => {
    setURL("")
    const options = {
      method: 'GET',
      url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
      params: {
        songId: `${URL}`
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY, // Ensure you have a VITE_API_KEY environment variable
        'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
      }
    };

    try {
      const rspn = await axios.request(options)
      // console.log(rspn.data.data.downloadLink)
      window.location.href = rspn.data.data.downloadLink
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <SlSocialSpotify size={50} />
        <p>Spotify Song Downloader</p>
      </div>

      {/* Input and Button Section */}
      <div className="input-container">
        <input
          type="url"
          placeholder="Enter Spotify song URL"
          onChange={handleURL}
          value={URL}
        />
        <button onClick={downloadSong}>Download</button>
      </div>
    </div>
  );
}

export default App;
