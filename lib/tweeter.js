var _ = require('underscore');
	twitter = require('twitter');

function Tweeter(opts) {
	_.extend(this, {
		twitter: new twitter ({
			consumer_key: process.env.CONSUMER_KEY,
		    consumer_secret: process.env.CONSUMER_SECRET,
		    access_token_key: process.env.ACCESS_TOKEN_KEY,
		    access_token_secret: process.env.ACCESS_TOKEN_SECRET
		})
	}, opts);
}

Tweeter.prototype.createStatusFromArticle = function(article) {
	var status = '';

	if (article.title.length > 117) {
		status = article.title.substring(0,116) + '…';
	} else {
		status = article.title;
	}

	return status + ' ' + article.link;
};

Tweeter.prototype.tweetArticle = function(article){
	this.twitter.updateStatus(this.createStatusFromArticle(article), function(response) {
		console.log(response);
	});
};

exports.Tweeter = Tweeter;