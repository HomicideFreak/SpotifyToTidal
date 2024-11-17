import "./MainCont.css"
import Button from "./Button";
import Input from "./Input";
import React, { useState, useEffect } from 'react'

function MainCont(){
    const [responseData, setResponseData] = useState(null);
    const [playlistData, setPlaylistData] = useState(null);
    const [spotifyData, setSpotifyData] = useState([]);

    useEffect(()=>{
        if(playlistData !== null){
            console.log(playlistData)
            for (let i = 0; i < playlistData['playlistData']['items'].length; i++) {   
                const newSongdata = {
                    name: playlistData['playlistData']['items'][i]['track']['name'],
                    artist: playlistData['playlistData']['items'][i]['track']['artists'][0]['name']
                };
                setSpotifyData(sd => [...sd, newSongdata])
            }
        }
    }, [playlistData]);

    useEffect(()=>{
        if(playlistData !== null){
            if (spotifyData.length === playlistData['playlistData']['items'].length) {
                // Make Spotipy retrieve more than 100 songs with offset
                // Make POST to TIDAL and write serverside handling for finding songs.
            }
        }
    }, [spotifyData]);

    const sendAuthCode = async (code) => {
        try{
            const getPlaylist = await fetch('http://127.0.0.1:5000/spotify/getPlaylist', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({code: code})
            });
            setPlaylistData(await getPlaylist.json());
            
        } catch{
            console.error('Error', error)
        }
    }

    useEffect(() => {
        if (responseData !== null){
            console.log(responseData);
            window.location = responseData.auth_url;      
        }
    }, [responseData]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if(code !== null){
            console.log(responseData);
            sendAuthCode(code);
        }
    }, []);


    const handleClick = async () => {
        const inputData = document.getElementById("playlistInput").value;
        try{
            const response = await fetch('http://127.0.0.1:5000/spotify',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data: inputData})
            });
            setResponseData(await response.json())
        } catch{
            console.error('Error', error)
        }
    }

    return(
        <div className="main-container">
            <h1 className="title-text">Spotify To Tidal</h1>
            <Input id="playlistInput" placeholder="Input playlist URL"/>
            <Button name="Transfer" func={handleClick}/>
        </div>
    );
}
export default MainCont;