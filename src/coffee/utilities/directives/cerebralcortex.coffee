directives = angular.module 'joji.directives', [] if !directives

directives.directive 'cerebralCortex', [ '$state', 'brainService', ($state, brainService) ->
	replace: false
	restrict: 'A'
	scope: true
	templateUrl: 'common/cortex'
	link: (scope, elem, attrs) ->
		console.log('hi');
		brainService.onTitleChange (title) ->
			scope.title = title
			return

		brainService.onUrlChange (url) ->
			scope.url = url
			return

		brainService.onImageChange (image) ->
			scope.image = image
			return

		return
]
