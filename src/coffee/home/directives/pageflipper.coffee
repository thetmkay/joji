directives = angular.module 'joji.directives', [] if !directives

directives.directive 'pageFlipper', ['$window', 'getHomePageService',($window, getHomePageService) ->
	restrict: 'E'
	scope: true
	replace: false
	templateUrl: 'home/pageflipper'
	link: (scope,element,attrs) ->
		angular.element(element).css(
			'height': ($window.innerHeight - 100) + 'px';
		)

		getHomePageService.loadImages()


		first_page = getHomePageService.getPage()

		setPage = (page) =>
			scope.text = page.text
			scope.highlight = page.highlight
			scope.color = page.color
			scope.bg = page.bg
			scope.dialogbg = page.dialogbg
			scope.url = page.url
			scope.linkclass = page.linkclass
			scope.linktext = page.linktext
			scope.opacity = page.opacity
			return

		setPage(first_page)

		scope.changeBackground = () ->
			newPage = getHomePageService.getNextPage()
			setPage(newPage)
			return
		return

]
