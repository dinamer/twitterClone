angular.module('twitterclone').factory('profileDataFactory', profileDataFactory);

function profileDataFactory($http) {
	return {
		tweetList: tweetList,
		postTweet: postTweet,
		getUser: getUser
	};

//post a tweet
function postTweet(tweet) {
	return $http
			.post('api/tweets', tweet)
			.then(complete)
			.catch(failed);
}

//get all tweets
function tweetList() {
	return $http
			.get('api/tweets')
			.then(complete)
			.catch(failed);
}

//get user object to simulate logged-in user
function getUser(username) {
	return $http
			.get('api/users/' + username)
			.then(complete)
			.catch(failed);
}

function complete(response) {
	return response;
}

function failed(error) {
	console.log(error.statusText);
}

}