directives = angular.module 'joji.directives', [] if !directives

directives.directive 'blogSlug', [ '$state', ($state) ->
	replace: true
	restrict: 'E'
	scope:
		post: '=forPost'
	templateUrl: 'blog/slug'
	link: (scope, elem, attrs) ->
		$elem = angular.element(elem)

		if(!Modernizr.touch)
			$elem.addClass('blogpost-link-hover')

		$elem.click () ->
			$state.go 'blog.post',
				posturl: scope.post.url
		# $elem.on 'touchend', () ->
		# 	$state.go 'blog.post',
		# 		posturl: scope.post.url
		return
]
