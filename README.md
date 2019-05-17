# Liri Bot App
A command line **L**anguage **I**nterpretation and **R**ecognition **I**nterface.

## Requirements
* NodeJS
* API Keys for Spofity, OMDB, and BandsInTown

## Setup
1. Ensure NodeJS is installed (https://nodejs.org/en/download/)
1. Clone this repository to your workstation
1. Run `npm i` from inside the **liri-node-app** folder
1. Within the **liri-node-app**, create a file called `.env`
1. Inside the `.env` file, type the following:
    * Enter your unique keys beside each identifier (no quotes)
    * BandsInTown API Key, OMDB API Key, and Spotify customer ID and secret key
```
SPOTIFY_ID=
SPOTIFY_SECRET=
OMDB_KEY=
BANDS_ID=
```

## Usage

### Node Command Line

* **concert-this**
    * Used to retrieve up-to-date live music dates for a band/artist via BandsInTown
    * Structure: `node liri-node-app.js concert-this <artist name>`
    * Example: `node liri-node-app.js concert-this Depeche Mode`
* **spotify-this-song**
    * Used to retrieve song track information via Spotify
    * Structure: `node liri-node-app.js spotify-this-song <song name>`
    * Example: `node liri-node-app.js spotify-this-song Macarena`
* **movie-this**
    * Used to query movie information via OMDB
    * Structure: `node liri-node-app.js movie-this <movie name>`
    * Example: `node liri-node-app.js movie-this Dune`
* **--help**
    * Use the `--help` command-line switch to get this information about command options
    * Example: `node liri-node-app.js --help`

### Batch List
* **do-what-it-says**
    * This command-line switch may be used to 'batch' a combination of the above types of queries into a readable file called **random.txt**
    * Command structure: `node liri-node-app.js do-what-it-says`
    * Each command/query appearing in **random.txt** should appear on it's own line using the following format:
        `[command],"search query"`
    * Example:
```
movie-this,"Sixteen Candles
spotify-this-song,"True
concert-this,"Depeche Mode
```
* Note: Avoid placing an empty line at the end of your random.txt file


