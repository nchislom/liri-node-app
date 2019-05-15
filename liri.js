// Set environment variables with dotenv package
require("dotenv").config();

// Importing keys.js file; stored as variable
var keys = require("./keys.js");

/************* 
  -= Liri Command Examples =-
  
    node liri-node-app.js concert-this <artist name>
    node liri-node-app.js spotify-this-song <song name>
    node liri-node-app.js movie-this <movie name>
    node liri-node-app.js do-what-it-says

****************/

var command = process.argv[2];
switch(command){
    case 'concert-this':
        getConcerts();
        break;

    case 'spotify-this-song':
        getSong();
        break;

    case 'movie-this':
        getMovie();
        break;

    case 'do-what-it-says':
        doThis();
        break;

    case '--help' || '--?':
        console.log("Commands you may use: concert-this, spotify-this-song, movie-this:");
        console.log("Examples:\n");
        console.log("node liri concert-this <artist name>");
        console.log("node liri spotify-this-song <song name>");
        console.log("node liri movie-this <movie name>");
        console.log("node liri do-what-it-says");
        break;

    default:
        console.log("Command not found: Try --help for additional commands.");
}

function getConcerts(input){
    let moment = require("moment");
    let axios = require("axios");
    let query = process.argv;
    let artistName = "";
    
    // Take function arg as search (if provided)
    if(input){
        artistName = input;
    } else {
        // Take CLI args if not arg passed into function directly
        if(query.length > 4){
            artistName = query[3];
            for(let i=4; i<query.length; i++){
                artistName += "+" + query[i];
            }
        } else {
            artistName = query[3];
        }
    }
    
    // Build URL string
    let queryURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=" + keys.bands.id;
    
    // Call to API via Axios
    axios.get(queryURL).then(
        function(response) {
            for(let i=0; i<response.data.length; i++){
                let data = response.data[i];
                console.log("\n-------------------\n");
                console.log("Venue name: " + data.venue.name);
                console.log("Location: " + data.venue.city + ", " + data.venue.region);
                console.log("Date: " + moment(data.datetime).format('L'));
            }
    }).catch((err) => {
        console.log(err);
    });

}

function getSong(input){
    let songTitle = "";
    let query = "";

    // Take function arg if provided
    if(input){
        songTitle = input;
    } else {
        // Build search string from CLI args
        query = process.argv;
        if(query.length > 4){
            songTitle = query[3];   
            for(let i=4; i<query.length; i++){
                songTitle += " " + query[i];
            }
        } else {
            songTitle = query[3];
        }
    }

    // Node-Spotify API call
    var Spotify = require('node-spotify-api');
    
    var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
    });
    
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let items = data.tracks.items;

        // Begin for loop to iterate through each results
        for(let i=0; i<items.length; i++){
            console.log("\n-------------------\n");
            console.log("Track: " + items[i].name);
            console.log("Album: " + items[i].album.name);

            // Check if more than one artist is included on each song
            if(items[i].artists.length == 1){
                // Single artist
                console.log("Artist: " + items[i].artists[0].name);
            } else {
                // Multiple artists
                let artists = items[i].artists[0].name;
                for(let a=0; a<items[i].artists.length; a++){
                    artists += ", " + items[i].artists[a].name;
                }
                console.log("Artists: " + artists);
            }
            // Output track preview URL if present
            let pUrl = "";
            if(items[i].preview_url == null){
                pUrl = "not available";
            } else {
                pUrl = items[i].preview_url;
            }
            console.log("Song preview URL: " + pUrl);
        }
    });
}

function getMovie(input){
    let axios = require("axios");
    let query = process.argv;
    let movieTitle = "";

    if(input){
        // Take function arg if provided
        movieTitle = input;
    } else {
        // Build movie title from CLI args
        if(query.length > 4){
            movieTitle = query[3];   
            for(let i=4; i<query.length; i++){
                movieTitle += "+" + query[i];
            }
        } else {
            movieTitle = query[3];
        }
    }

    let queryURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + keys.omdb.key;

    // Axios API call to OMDB
    axios.get(queryURL).then(
        function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
    });

}

function doThis(){
    // fs is a core Node package for reading and writing files
    var fs = require("fs");

    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        
        // Split random.txt into lines (each a separate request)
        var requests = data.split("\n");
        for(line in requests){
            let currentLine = requests[line].split(",");
            let cmd = currentLine[0];
            let search = currentLine[1].replace(/"/g, "");
            switch(cmd){
                case 'concert-this':
                    getConcerts(search);
                    break;

                case 'spotify-this-song':
                    getSong(search);
                    break;

                case 'movie-this':
                    getMovie(search);
                    break;
            }
        }
    });
}

getSong("I Want It That Way");