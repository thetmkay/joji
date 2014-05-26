directives = angular.module 'joji.directives', [] if !directives

directives.directive 'cascadeStream', ['$window', ($window) ->
	restrict: 'E'
	scope: true
	replace: false
	templateUrl: 'home/cascadestream'
	link: (scope,element,attrs) ->
		console.log Modernizr
		if($window.innerWidth >= 400)
			angular.element('document').cascadeStream()

		$elem = angular.element(element)

		return

]
