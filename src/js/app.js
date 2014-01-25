angular.module('joji', [
	'joji.controllers', 
	'joji.services', 
	'joji.directives',
	'ui.router'
]).
config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.
		state('home', {
			url: '/',
			views: {
				mainView: {
					templateUrl: 'home/main'
				}
			}
		}).
		state('blog', {
			url: '/blog',
			views: {
				mainView: {
					templateUrl: 'blog/main'
				}
			},
			onEnter : function() {
			}
		});

	$locationProvider.html5Mode(true);
}]);