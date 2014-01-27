app = angular.module 'joji', [
	'joji.controllers', 
	'joji.services', 
	'joji.directives',
	'ui.router',
	'ngResource'
]
app.config ['$locationProvider', '$stateProvider', '$urlRouterProvider', ($locationProvider,$stateProvider,$urlRouterProvider) ->
	$urlRouterProvider.otherwise '/'

	$stateProvider
		.state 'home',
			url: '/'
			templateUrl: 'home/main'
		.state 'blog',
			url: '/blog'
			abstract: true
			template: "<ui-view/>"
		.state 'blog.list', 
			url: ''
			parent: 'blog'
			templateUrl: 'blog/list'
		.state 'blog.post', 
			url: '/post/:posturl'
			parent: 'blog'
			templateUrl: 'blog/page'
			onEnter: ['$stateParams', 'postalService', ($stateParams, postalService) ->
				console.log($stateParams.posturl)
				postalService.retrievePostData $stateParams.posturl
			]
		

	$locationProvider.html5Mode true
]