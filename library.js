// class representing each era
class era {
    constructor(elo, playlist, playlistID, numOfPlaylistTracks) {
        this.elo = elo;
        this.playlist = playlist;
        this.playlistID = playlistID;
        this.numOfPlaylistTracks = numOfPlaylistTracks;
    }
}

// create objects for each era
let baroque = new era(1500, [], '7HQ42wa60yV6mPU2c27wWi', 0);
let classical = new era(1500, [], '1MBOHYCHDlP2465YFzvI7d', 0);
let romantic = new era(1500, [], '5CqdLCYANgrFICViNS6N5x', 0);
let modern = new era(1500, [], '2lUzj0RZHxXzFgPW3UaLqP', 0);

// export objects
module.exports = {
    baroque,
    classical,
    romantic,
    modern
}