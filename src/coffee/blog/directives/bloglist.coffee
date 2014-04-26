directives = angular.module 'joji.directives', [] if !directives

directives.directive 'blogList', [ 'getPostsService', (getPostsService) ->
	replace: true
	restrict: 'E'
	scope: true
	templateUrl: 'blog/list'
	link: (scope,elem, attrs) ->
		scope.posts = []
		getPostsService.getPosts().then (posts) =>
			console.log('deferred')
			scope.posts = posts

			return
		return
]
