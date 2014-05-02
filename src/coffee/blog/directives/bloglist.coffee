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
			posts.forEach((post) ->
				post.date_stamp = new Date(post.shown_date).toLocaleDateString()
				console.log(post.date_stamp);
				return
			);
			scope.posts = posts

			return
		return
]
