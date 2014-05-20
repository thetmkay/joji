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
			posts.forEach((post, index) ->
				#post.date_stamp = new Date(post.shown_date).toLocaleDateString()
				post.index = index+1
				console.log(post.date_stamp);
				return
			);
			scope.posts = posts
			scope.post_filter = ''
			scope.changeFilter = (filter, event) ->
				if(filter is scope.post_filter)
					scope.post_filter = ''
					return 
				$elem = angular.element(event.target)
				scope.post_filter = filter
				$elem.siblings('.active').removeClass('active')
				$elem.addClass('active')
				return
			scope.filterFn = (actual) ->
				return !scope.post_filter || angular.equals(actual.category, scope.post_filter)

			return
		return
]
