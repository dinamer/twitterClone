angular.module('twitterclone', ['ngRoute'])
	.run(function($rootScope) {
		$rootScope.authenticated = true;
		$rootScope.currentUser = { username: 'user2'};
	})
	.config(config);

function config($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'TwitterCloneUI/profile/profilePage.html',
		controller: 'ProfilePageController',
		controllerAs: 'vm'
	});

}