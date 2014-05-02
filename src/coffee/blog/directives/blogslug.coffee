directives = angular.module 'joji.directives', [] if !directives

directives.directive 'blogSlug', [ '$state', ($state) ->
	replace: true
	restrict: 'E'
	scope:
		post: '=forPost'
	templateUrl: 'blog/slug'
	link: (scope, elem, attrs) ->
		$elem = angular.element elem
		$elem.click () ->
			$state.go 'blog.post',
				posturl: scope.post.url
		$elem.mouseover () ->
			$elem.find('.slug-container').addClass('show-on-hover');
		$elem.mouseleave () ->
			$elem.find('.slug-container').removeClass('show-on-hover');
		return
]
