'use strict';
const twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');
const keys = require('./keys.js');
// const logger = require('./logger.js');
const twitterKeys = keys.twitterKeys;
// const omdbKey = keys.omdbKey;
const spotifyKeys = keys.spotifyKeys;
const client = new twitter(twitterKeys);
const spotifyApp = new spotify(spotifyKeys);



let twitterCall = () => {
	let params = { screen_name: 'andrsalx' };
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (let i = 0; i < tweets.length; i++) {
                    let tweet = tweets[i];
                    let result = `Tweet #${i + 1}:\nDate: ${tweet.created_at}\nTweet content: ${tweet.text}\n`;
                    console.log('Twitter', result);
                }
            } else {
                console.log(JSON.stringify(error));
            }
        });
};

let spotifyCall = () => {

  spotifyApp.search({ type: 'track', query: process.argv[3], limit: 1 })
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

// let omdbCall = () => {

// };

// let doItCall = () => {

// };


// using an object literal in place of a switch case for readability and efficiency
// let chooseFunc = (type) => {
//   let funcOptions = {
//     'my-tweets': twitterCall(),
//     'spotify-this-song': spotifyCall()
//     // 'movie-this': omdbCall(),
//     // 'do-what-it-says': doItCall()
//   }
//   return funcOptions[type]();
// }

//calling the function above
// let userInput = chooseFunc(process.argv[2]);
if (process.argv[2] === 'spotify-this-song'){
	spotifyCall();
}
