directives = angular.module 'joji.directives', [] if !directives

directives.directive 'homeSlide', [ () ->
	templateUrl: (element, attributes) ->
		'home/slides/' + attributes.templatename
	replace: true
	restrict: 'E'
	scope: true
	controller: ($scope , $attrs) ->
		this.slideIndex = parseInt $attrs.index
		return
	link: (scope, element, attributes) ->
		scope.$watch 'height', ->
			element.css 
				'height': scope.height + 'px'
			return
]