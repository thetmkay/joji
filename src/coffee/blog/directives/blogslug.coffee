directives = angular.module 'joji.directives', [] if !directives

directives.directive 'blogSlug', [ () ->
	replace: true
	restrict: 'E'
	scope:
		post: '=forPost'
	templateUrl: 'blog/slug'
	link: (scope, elem, attrs) ->
		$elem = angular.element elem
		$elem.mouseover () ->
			$elem.find('div').addClass('show-on-hover');
		$elem.mouseleave () ->
			$elem.find('div').removeClass('show-on-hover');
		return
]
