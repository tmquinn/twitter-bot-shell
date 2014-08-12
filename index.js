function textBot() {
	"use strict";

	var Bot = require('tmq-twitter-bot'),
		tweets = require('./tweets'),
		_ = require('underscore'),
		config;

	try {
		config = require('./config');
	} catch (err) {
		config = {
			consumer_key: process.env.CONSUMER_KEY,
			consumer_secret: process.env.CONSUMER_SECRET,
			access_token: process.env.ACCESS_TOKEN,
			access_token_secret: process.env.ACCESS_TOKEN_SECRET
		};
	}

	var bot = new Bot(config);

	var status;

	while (!status || status.length > 140) {
		status = tweets[_.random(tweets.length - 1)];
	}

	console.log('Tweeting: ' + status);

	bot.tweet(status)
		.then(function (result) {
			console.log(result);
		})
		.catch(function (err) {
			console.log(err);
		});
}

console.log('FOOOOOOOOOOOOOOOOO');

textBot();

//setInterval(textBot, 0.5 * 60 * 1000);
