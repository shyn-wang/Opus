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

// array containing the four era objects
const eras = [
    library.baroque,
    library.classical,
    library.romantic,
    library.modern
]

// set the playlist property in each era object to an array containing all the tracks in the playlist on spotify
function initializePlaylists() {
    let counter = 0;
    for (const era of eras) {
        spotifyApi.getPlaylistTracks(era.playlistID, function(err, data) {
            if (err) {
                console.log(err);
            
            } else {
                era.playlist = data.items;
                era.numOfPlaylistTracks = data.total;
                console.log(data.total);
                console.log(era.playlist);
                counter++;
                console.log(counter);

                if (counter == 4) {
                    // change to choose initial matchup once displayTracks function is built
                    selectMatchups();
                }
            }
        });
    }
}

// intakes objects containing track info
function displayTracks(leftTrack, rightTrack) {
    // **left side**
    // album cover
    const coverLeft = leftTrack.album.images[1].url;
    console.log(coverLeft);
    // piece title
    const titleLeft = leftTrack.name;
    console.log(titleLeft);
    // performer
    const performerLeft = leftTrack.artists[1].name;
    console.log(performerLeft);
    // composer
    const composerLeft = leftTrack.artists[0].name;
    console.log(composerLeft);
    // preview url
    const previewLeft = leftTrack.preview_url;
    console.log(previewLeft);
    // spotify url
    spotifyLeft = leftTrack.external_urls.spotify;
    console.log(spotifyLeft);

    // display info
    const coverLeftId = document.getElementById('leftCover');
    const titleLeftId = document.getElementById('leftTitle');
    const descriptionLeftId = document.getElementById('leftDescription');
    const previewLeftId = document.getElementById('leftPreview');
    
    coverLeftId.src = coverLeft;
    titleLeftId.innerHTML = titleLeft
    descriptionLeftId.innerHTML = `${performerLeft}, ${composerLeft}`;
    previewLeftId.src = previewLeft;

    // **right side**
    // album cover
    const coverRight = rightTrack.album.images[1].url;
    console.log(coverRight);
    // piece title
    const titleRight = rightTrack.name;
    console.log(titleRight);
    // performer
    const performerRight = rightTrack.artists[1].name;
    console.log(performerRight);
    // composer
    const composerRight = rightTrack.artists[0].name;
    console.log(composerRight);
    // preview url
    const previewRight = rightTrack.preview_url;
    console.log(previewRight);
    // spotify url
    spotifyRight = rightTrack.external_urls.spotify;
    console.log(spotifyRight);

    // display info
    const coverRightId = document.getElementById('rightCover');
    const titleRightId = document.getElementById('rightTitle');
    const descriptionRightId = document.getElementById('rightDescription');
    const previewRightId = document.getElementById('rightPreview');
    
    coverRightId.src = coverRight;
    titleRightId.innerHTML = titleRight;
    descriptionRightId.innerHTML = `${performerRight}, ${composerRight}`;
    previewRightId.src = previewRight;
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
        updateElo(leftEra, rightEra);
    }
}

function rightClick() {
    if (rightBtnClick == true) {
        console.log('btn right clicked');
        rightBtnClick = false;
    } else {
        console.log('side right clicked');
        updateElo(rightEra, leftEra);
    }
}

// set to spotify url by displayTracks function
let spotifyLeft;

function leftBtn() {
    leftBtnClick = true;
    window.open(spotifyLeft, '_blank');
}

// set to spotfiy url by displayTracks function
let spotifyRight;

function rightBtn() {
    rightBtnClick = true;
    window.open(spotifyRight, '_blank');
}

// select initial matchups
let initialMatchups = eras.slice(); // make copy of eras array so changes are not shared
shuffleArray(initialMatchups);
console.log(initialMatchups);

// durstenfeld shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// true when less than two matchups have occured
let onInitialMatchups = true;
// tracks the eras on screen
let leftEra;
let rightEra;

function selectMatchups() {
    if (onInitialMatchups == true) {
        leftEra = initialMatchups[0];
        rightEra = initialMatchups[1];
        initialMatchups.splice(0, 2);
        console.log(initialMatchups);
        console.log(eras);

        if (initialMatchups.length == 0) {
            onInitialMatchups = false;
            console.log(onInitialMatchups);
        }
    } else {
        let probabilities = [];

        // sort probabilities array to match index of eras array (BAD PRACTICE, NOT SCALABLE -> fix later by guaranteeing arrays are in same order as declaration or other solution)
        const baroqueIndex = eras.indexOf(library.baroque);
        const classicalIndex = eras.indexOf(library.classical);
        const romanticIndex = eras.indexOf(library.romantic);
        const modernIndex = eras.indexOf(library.modern);

        const erasZero = eras[0];
        const erasOne = eras[1];
        const erasTwo = eras[2];
        const erasThree = eras[3];

        probabilities.push(erasZero.probability);
        probabilities.push(erasOne.probability);
        probabilities.push(erasTwo.probability);
        probabilities.push(erasThree.probability);

        console.log(probabilities);
        console.log(`${baroqueIndex}, ${probabilities.indexOf(library.baroque.probability)}`);
        console.log(`${classicalIndex}, ${probabilities.indexOf(library.classical.probability)}`);
        console.log(`${romanticIndex}, ${probabilities.indexOf(library.romantic.probability)}`);
        console.log(`${modernIndex}, ${probabilities.indexOf(library.modern.probability)}`);
        

        leftEra = selectRandomWithProbability(eras, probabilities);
        rightEra = selectRandomWithProbability(eras, probabilities);
        console.log(eras);
        if (rightEra == leftEra) {
            while (rightEra == leftEra) {
                rightEra = selectRandomWithProbability(eras, probabilities);
            }
        }
    }
    getRandomTrack(leftEra, rightEra);
}

// select post-initial matchups
function selectRandomWithProbability(array, probabilities) {
    // calculate total probability
    const totalProbability = probabilities.reduce((acc, prob) => acc + prob, 0);

    // generate a random number between 0 and totalProbability
    const randomNum = Math.random() * totalProbability;
    console.log(randomNum);

    // iterate through the array and find the element corresponding to the generated random number
    let cumulativeProbability = 0;
    for (let i = 0; i < array.length; i++) {
        cumulativeProbability += probabilities[i];
        if (randomNum <= cumulativeProbability) {
            return array[i];
        }
    }
}

function getRandomTrack(leftEra, rightEra) {
    console.log('fhwioafhdaw');
    console.log(leftEra);
    console.log(rightEra);
    console.log(leftEra.playlist);

    const rangeLeft = leftEra.playlist.length -1;
    const rangeRight = rightEra.playlist.length -1;

    const leftTrackIndex = Math.floor(Math.random() * (rangeLeft + 1));
    const rightTrackIndex = Math.floor(Math.random() * (rangeRight + 1));

    const leftTrack = leftEra.playlist[leftTrackIndex];
    leftEra.playlist.splice(leftTrackIndex, 1);
    console.log(leftEra.playlist);
    const rightTrack = rightEra.playlist[rightTrackIndex];
    rightEra.playlist.splice(rightTrackIndex, 1);

    displayTracks(leftTrack.track, rightTrack.track);
}

// update elo and probability function: call on side click
function updateElo(winner, loser) {
    // calculate expected win probability
    const winnerRating = winner.elo;
    const loserRating = loser.elo;
    const winProbability = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));

    // update Elos
    const K = 32;
    const winnerEloGained = 32 * (1 - winProbability);
    const loserEloLost = 32 * (0 - winProbability);
    winner.elo = winnerRating + winnerEloGained;
    loser.elo = loserRating + loserEloLost;

    // update probabilities based on elo gained/lost
    const winnerUpdatedProbability = winnerEloGained / 128;
    const loserUpdatedProbability = loserEloLost / 128;
    winner.probability += winnerUpdatedProbability;
    if ((loser.probability + loserUpdatedProbability) < 0.10) {
        loser.probability = 0.10;
    } else {
        loser.probability += loserUpdatedProbability;
    }

    // select next matchup
    selectMatchups();
}

// enable functions to be accessed globally
window.authenticate = authenticate;
window.initializePlaylists = initializePlaylists;
window.leftClick = leftClick;
window.rightClick = rightClick;
window.leftBtn = leftBtn;
window.rightBtn = rightBtn;
window.displayTracks = displayTracks;