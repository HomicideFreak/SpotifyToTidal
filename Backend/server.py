from flask import Flask, request, jsonify
from flask_cors import CORS
import spotipy
from spotipy.oauth2 import SpotifyOAuth

app = Flask(__name__)
CORS(app)


scope = "user-library-read"
sp_oauth = SpotifyOAuth(
    client_id="a6f6b1c49ccb4077a02019ee761e3f62",
    client_secret="c5ae229039bb4f6c9b998cad28ffca60",
    redirect_uri="http://localhost:5173/",
    scope=scope
)

auth_url = None
playlist_url = None

@app.route('/spotify', methods=['POST'])
def index():
    try:
        data = request.get_json()
        print(f"Received data: {data}")
        global playlist_url
        playlist_url = data.get('data')
        
        global auth_url
        auth_url = sp_oauth.get_authorize_url()
        print("Wysłano auth url")
        return jsonify({'auth_url' : f"{auth_url}"}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route(f'/spotify/getPlaylist', methods=['POST'])
def genToken():
    try:
        reqData = request.get_json()
        code = reqData.get('code')
        print(f"Code received: {code}")
        token_info = sp_oauth.get_access_token(code)
        access_token = token_info['access_token']
        sp = spotipy.Spotify(auth=access_token)
        playlistData = sp.playlist_items(playlist_id=playlist_url, limit=100)
        print(playlistData)
        return jsonify({'playlistData': playlistData}), 200
        
        
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400
        
        
        
        

app.run(host="127.0.0.1", port=5000)