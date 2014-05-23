directives = angular.module 'joji.directives', [] if !directives

directives.directive 'homePage', [() ->
	restrict: 'E'
	scope: true
	replace: true
	templateUrl: 'home/page'
	link: (scope,element,attrs) ->
		return

]
