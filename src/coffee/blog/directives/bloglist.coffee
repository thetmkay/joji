directives = angular.module 'joji.directives', [] if !directives

directives.directive 'blogList', [ 'getPostsService', 'brainService', (getPostsService, brainService) ->
	replace: true
	restrict: 'E'
	scope: true
	templateUrl: 'blog/list'
	link: (scope,elem, attrs) ->
		scope.posts = []
		brainService.setUrl("/blog")
		brainService.setTitle('Recent Blog Posts')
		getPostsService.getPosts().then (posts) =>
			posts.forEach((post) ->
				post.date_stamp = new Date(post.shown_date).toLocaleDateString()
				console.log(post.date_stamp);
				return
			);
			scope.posts = posts

			return
		return
]
