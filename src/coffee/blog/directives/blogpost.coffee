directives = angular.module 'joji.directives', [] if !directives

directives.directive 'blogPost', ['postalService', '$stateParams', (postalService, $stateParams) -> 
	restrict: 'E'
	scope: true
	replace: false
	templateUrl: 'blog/post'
	link: (scope,element,attrs) ->
		console.log 'dddddd'
		postalService.getPost($stateParams.posturl).then (post)=>
			scope.content = post.content
			scope.title = post.title
			return
		return
]