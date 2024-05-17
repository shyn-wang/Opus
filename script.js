// set up spotify api
const Spotify = require('spotify-web-api-js');
const spotifyApi = new Spotify();

// import request to make post requests
const request = require('request');

// import library file
const library = require('./library');

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

            initializePlaylists();

        } else {
            console.log(error);
        }
    });
}   

let leftSideTrack;
let rightSideTrack;

// array containing the four era objects
const eras = [
    library.baroque,
    library.classical,
    library.romantic,
    library.modern
]

// set the playlist property in each era object to an array containing all the tracks in the playlist on spotify
function initializePlaylists() {
    for (const era of eras) {
        spotifyApi.getPlaylistTracks(era.playlistID, function(err, data) {
            if (err) {
                console.log(err);
            
            } else {
                era.playlist = data.items;
                era.numOfPlaylistTracks = data.total;
                console.log(data.total);
                console.log(era.playlist);
            }
        });
    }
}

// intakes objects containing track info
function displayTracks(leftTrack, rightTrack) {
    // left side
    // const titleLeft = leftTrack
}


// check to see if either the button or the side was clicked
let leftBtnClick = false;
let rightBtnClick = false;

function leftClick() {
    if (leftBtnClick == true) {
        console.log('btn left clicked');
        leftBtnClick = false;
    } else {
        console.log('side left clicked');
    }
}

function rightClick() {
    if (rightBtnClick == true) {
        console.log('btn right clicked');
        rightBtnClick = false;
    } else {
        console.log('side right clicked');
    }
}

function leftBtn() {
    leftBtnClick = true;
}

function rightBtn() {
    rightBtnClick = true;
}

// enable functions to be accessed globally
window.authenticate = authenticate;
window.initializePlaylists = initializePlaylists;
window.leftClick = leftClick;
window.rightClick = rightClick;
window.leftBtn = leftBtn;
window.rightBtn = rightBtn;
window.displayTracks = displayTracks;