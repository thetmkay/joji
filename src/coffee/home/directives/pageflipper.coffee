directives = angular.module 'joji.directives', [] if !directives

directives.directive 'pageFlipper', ['$interval','$window', 'getHomePageService',($interval, $window, getHomePageService) ->
	restrict: 'E'
	scope: true
	replace: false
	templateUrl: 'home/pageflipper'
	link: (scope,element,attrs) ->
		angular.element(element).css(
			'height': ($window.innerHeight - 100) + 'px';
		)



		first_page = getHomePageService.getPage()

		setPage = (page) =>
			scope.text = page.text
			scope.color = page.color
			scope.bg = page.bg
			scope.dialogbg = page.dialogbg
			scope.url = page.url
			scope.linktext = page.linktext
			scope.opacity = page.opacity
			return

		setPage(first_page)

		this.flip = () =>
			newPage = getHomePageService.getNextPage()
			setPage(newPage)
			return

		interval = false

		animateBackground = () =>
			this.flip()
			interval = $interval(this.flip, 3000)
			return

		getHomePageService.loadImages(animateBackground)

		scope.changeBackground = () ->
			$interval.cancel(interval)
			flip()
			return
		return

]
