directives = angular.module 'joji.directives', [] if !directives

directives.directive 'cascadeStream', [() ->
	restrict: 'E'
	scope: true
	replace: false
	templateUrl: 'home/cascadestream'
	link: (scope,element,attrs) ->
		scope.rows = [0,1,2]
		scope.bio = ["<p>Hello World</p>","<p>Hello World</p>","<p>Hello World</p>"]
		scope.about = ["<p>Hi World</p>","<p>Hi World</p>","<p>Hi World</p>"]
		scope.third = ["<p>Hello Universe</p>","<p>Hello Universe</p>","<p>Hello Universe</p>"]

		console.log(angular.element('.cs-block'));
		angular.element('document').cascadeStream();

		return

]
