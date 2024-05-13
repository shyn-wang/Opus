// class representing each era
class era {
    constructor(elo, playlist, playlistID) {
        this.elo = elo;
        this.playlist = playlist;
        this.playlistID = playlistID;
    }
}

// create objects for each era
let baroque = new era(1500, [], '7HQ42wa60yV6mPU2c27wWi');
let classical = new era(1500, [], '1MBOHYCHDlP2465YFzvI7d');
let romantic = new era(1500, [], '5CqdLCYANgrFICViNS6N5x');
let modern = new era(1500, [], '2lUzj0RZHxXzFgPW3UaLqP');

// export objects
module.exports = {
    baroque,
    classical,
    romantic,
    modern
}