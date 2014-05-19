directives = angular.module 'joji.directives', [] if !directives

directives.directive 'blogSlug', [ '$state', ($state) ->
	replace: true
	restrict: 'E'
	scope:
		post: '=forPost'
	templateUrl: 'blog/slug'
	link: (scope, elem, attrs) ->
		$elem = angular.element(elem).parent()

		if(!Modernizr.touch)
			console.log(Modernizr)
			$elem.mouseover () ->
				$elem.find('.slug-container').addClass('slug-hover')
			$elem.mouseleave () ->
				$elem.find('.slug-container').removeClass('slug-hover')
		
		console.log $elem

		$elem.click () ->
			$state.go 'blog.post',
				posturl: scope.post.url
		# $elem.on 'touchend', () ->
		# 	$state.go 'blog.post',
		# 		posturl: scope.post.url
		return
]
