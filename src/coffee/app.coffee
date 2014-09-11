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
		.state 'blog',
			url: '/'
			abstract: true
			template: "<ui-view/>"
		.state 'blog.list',
			url: ''
			parent: 'blog'
			templateUrl: 'blog/home'
		.state 'blog.post',
			url: 'post/:posturl'
			parent: 'blog'
			templateUrl: 'blog/page',
			onEnter: ['$stateParams', 'getPostService', ($stateParams, getPostService) ->
				getPostService.retrievePostData $stateParams.posturl
			]


	$locationProvider.html5Mode true
]
