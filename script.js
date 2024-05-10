const Spotify = require('spotify-web-api-js');
const spotifyApi = new Spotify();

const request = require('request');

function authenticate() {
    // retrieve access token via client credentials flow
    const client_id = 'ba8a934edb394682875251ae89f80a51';
    const client_secret = '8a9d8c6b544a43348a942282c1bc2299';

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // input access token to authenticate client
            spotifyApi.setAccessToken(body.access_token);
            
            console.log(response);
            console.log(body.access_token);
            console.log(body.expires_in);
        
        } else {
            console.log(error);
        }
    });
}   

function getTracks() {

}

// make global
window.authenticate = authenticate;