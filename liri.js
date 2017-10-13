var Twitter = require("twitter");
var twitterKeys = require("./key.js");
var nodeSpotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var client = new Twitter(twitterKeys);

var params = {screen_name: 'HookFauchard', count: 20};

var command = process.argv[2];
var selection = process.argv[3];

for (i = 4; i < process.argv.length; i++) {
	selection += "+" + process.argv[i];
}



switch (command) {
  case "my-tweets":
    myTs();
    break;

  case "spotify-this-song":
    spot();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    rand();
    break;

  default:
  	console.log("enter 'my-tweets', 'spotify-this-song', 'movie-this <movie title>', or 'do-what-it-says'")
}



function myTs() {
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
    		//console.log(tweets);
    		for (i = 0; i < tweets.length; i++) {
    			var tweetData = ((i + 1) + "\n" + tweets[i].created_at + "\n" + tweets[i].text + "\n");
    			console.log(tweetData);
    		}
  		} else {
  			console.log("error");
  		}
	});
}


function spot() {
	console.log("spotify")
	var spotify = new nodeSpotify({
  		id: 'a0bf6410d95d4a57a5a6def67b903515',
  		secret: 'accfd4b0ed084b1194f7c5f64c10d279',
	});
  		
  		if (selection == null) {
  			selection = "\"" + "The Sign" + "\"";
  		}

		spotify.search({ type: 'track', query: selection }, function(error, data) {
  			
  			console.log("Artist: " + data.tracks.items[0].artists[0].name);
  			console.log("Song: " + data.tracks.items[0].name);
  			console.log("Album: " + data.tracks.items[0].album.name);

	});
}


function movie() {
	console.log("ya member that one movie?")
	var queryUrl = "http://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body){

  		if (!error && response.statusCode === 200) {
  			console.log("Title: " + JSON.parse(body).Title);
  			console.log("Release Year: " + JSON.parse(body).Year);
  			console.log("IMDB: " + JSON.parse(body).imdbRating);
  			console.log("Rotten Tomatoes: " + JSON.parse(body).rottenTomatoes); //For some reason I can't find the Rotten Tomatoes rating
  			console.log("Country: " + JSON.parse(body).Country);
  			console.log("Language: " + JSON.parse(body).Language);
  			console.log("Plot: " + JSON.parse(body).Plot);
  			console.log("Actors: " + JSON.parse(body).Actors);
  		} else {
  			console.log("I don't member.")
  		}

	});
}


function rand() {
	console.log("lolsorandum")

	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return;
		}
			var array = data.split(",");

			command = array[0].trim();
			selection = array[1].trim();
			spot();
			
	});

}