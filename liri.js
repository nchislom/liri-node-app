// Set environment variables with dotenv package
require("dotenv").config();

// Importing keys.js file; stored as variable
var keys = require("./keys.js");

// Variable assigned to access keys
var spotify = new Spotify(keys.spotify);

/************* 
  -= Liri Commands =-
  
    concert-this
    spotify-this-song
    movie-this
    do-what-it-says

****************/

switch(process.argv[2]){
    case 'concert-this':
        // actions to take for command argument
        console.log('Firing bands in town actions...');
        break;
        case 'spotify-this-song':
        // actions to take for command argument
        console.log('Firing Spotify actions...');
        break;
        case 'movie-this':
        // actions to take for command argument
        console.log('Firing OMDB actions...');
        break;
        case 'do-what-it-says':
        // actions to take for command argument
        console.log('Firing "do-what-it-says" actions...');
        break;
    default:
        console.log("I'm sorry Dave, I'm afraid I can't do that...");
}