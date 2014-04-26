directives = angular.module 'joji.directives', [] if !directives

directives.directive 'blogNav', ['getPostService', '$stateParams', (getPostService, $stateParams) ->
	restrict: 'E'
	scope: true
	replace: false
	templateUrl: 'blog/navmenu'
	link: (scope,element,attrs) ->
		console.log('bbbbbbb')
		getPostService.getPost($stateParams.posturl).then (post)=>
			console.log(post);
			if(post.prev_url)
				scope.prev_url = post.prev_url
				scope.prev_title = post.prev_title
			if(post.next_url)
				scope.next_url = post.next_url
				scope.next_title = post.next_title
			return
		return
]
