directives = angular.module 'joji.directives', [] if !directives

directives.directive 'shareLinks', ['$stateParams','getPostService', ($stateParams,getPostService) ->
	replace: false
	restrict: 'E'
	scope: true
	templateUrl: 'blog/sharelinks'
	link: (scope, elem, attrs) ->
		getPostService.getPost($stateParams.posturl).then (post) ->
			console.log(elem);
			$elem = angular.element(elem).find('.qs-container')
			$elem.data('qs-title', $elem.data('qs-title') + post.title)
			$elem.data('qs-url', $elem.data('qs-url') + post.url)
			scope.showShare = true
			quickShare('.share-links');
			return
		return
]
