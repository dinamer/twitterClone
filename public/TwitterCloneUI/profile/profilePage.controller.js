angular.module('twitterclone').controller('ProfilePageController', ProfilePageController);

function ProfilePageController($route, $routeParams, profileDataFactory, $rootScope) {

var vm = this;
vm.isSubmitted = false;

//send user and tweet list to model
profileDataFactory
	.getUser($rootScope.currentUser.username)
	.then( function (response) {
	vm.currentUser = response.data;
	vm.userTweets = response.data.tweets;
});

//add post tweet function to model
vm.addTweet = function() {

var postData = {
	text: vm.text,
	createdOn: Date.now(),
	username: $rootScope.currentUser.username

};

//post tweet and refresh tweet list and tweet count
if(vm.tweetForm.$valid) {
  profileDataFactory.postTweet(postData)
  		.then( function(response) {
			if (response.status === 201) {
				$route.reload();
		}}).catch(function(error) {
  				console.log(error)});
} else {
	vm.isSubmitted = true;
}
};


}