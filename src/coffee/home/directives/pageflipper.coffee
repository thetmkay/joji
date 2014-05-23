directives = angular.module 'joji.directives', [] if !directives

directives.directive 'pageFlipper', [() ->
	restrict: 'E'
	scope: true
	replace: false
	templateUrl: 'home/pageflipper'
	link: (scope,element,attrs) ->
		return

]
