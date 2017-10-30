'use strict';
const twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');
// const doIt = require('./random.txt')
const keys = require('./keys.js');
const fs = require('fs')
const twitterKeys = keys.twitterKeys;
const spotifyKeys = keys.spotifyKeys;
const omdbKey = keys.omdbKey;
const client = new twitter(twitterKeys);
const spotifyApp = new spotify(spotifyKeys);
const selection = process.argv[2]
const arg = process.argv[3]




let twitterCall = () => {
	let params = { screen_name: 'andrsalx' };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (let i = 0; i < tweets.length; i++) {
          let tweet = tweets[i];
          console.log(`Tweet #${i + 1}:
Date: ${tweet.created_at}
Tweet content: ${tweet.text}`);
      }
    } else {
      console.log(JSON.stringify(error));
    }
  });
};

let spotifyCall = (arg) => {
 spotifyApp.search({ type: 'track', query: arg, limit: 1 })
  .then(function(response) {
   	let name = response.tracks.items[0].name;
   	let album = response.tracks.items[0].album.name
   	let artist = response.tracks.items[0].artists[0].name;
   	let previewUrl = response.tracks.items[0].preview_url;
     console.log(`Song: ${name}
Album: ${album}
Artist: ${artist}
Preview URL: ${previewUrl}`);
   })
   .catch(function(err) {
     console.log(err);
   });
 };


let omdbCall = (arg) => {
	let movie = encodeURIComponent('Mr. Nobody');
    if (arg) {
        movie = encodeURIComponent(arg);
    }
    request(`http://www.omdbapi.com/?apikey=${omdbKey}&t=${movie}`, (error, response, body) => {
      if (!error) {
        try {
            let jsonObj = JSON.parse(body);
             console.log(`Title: ${jsonObj.Title}
Year: ${jsonObj.Year}
IMDB Rating: ${jsonObj.Ratings[0].Value}
Rotten Tomatoes Rating: ${jsonObj.Ratings[1].Value}
Country: ${jsonObj.Country}
Language: ${jsonObj.Language}
Plot: ${jsonObj.Plot}
Actors: ${jsonObj.Actors}`);
        } catch (e) {
            console.log('Error, try again');
        }
      } else {
          console.log(error);
      }
    });

};

let doItCall = () => {
	// fs.readFile('random.txt', "utf8",(error, data) =>{
	// 		if (error) {
	//     		return console.log(error);
	//   		}
	// 		let arr = data.split('');
	// 		if (arr[0] === "spotify-this-song") {
	// 			let song = arr[1].slice(1, -1);
	// 			spotifyCall(song);
	// 		}
	// })
	console.log('help')
};


switch (selection) {
	case "my-tweets":
	twitterCall();
	break;

	case "spotify-this-song":
	spotifyCall(arg);
	break;

	case "movie-this":
	omdbCall(arg);
	break;

	case "do-what-it-says":
	doItCall();
	break;
};