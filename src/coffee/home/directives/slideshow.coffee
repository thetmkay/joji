directives = angular.module 'joji.directives', [] if !directives

directives.directive 'homeSlideShow', ['$document','$window',($document,$window) -> 
	templateUrl: 'home/slideshow'
	replace: true
	scope: true
	restrict: 'E'
	controller: ($scope) ->
		$scope.slide_index = 0
		this.changeIndex = (index) ->
			$scope.slide_index = index;
			$scope.changePage()
			return
		this.getIndex = ->
			$scope.slide_index
		return
	link: (scope,element,attrs) ->

		scope.setWindowSize = ->
			scope.height = $window.innerHeight
			scope.width  = $window.innerWidth
			return

		scope.setWindowSize()

		# scope.$watch('index', ->(newIndex) {

		# })
		
		last_page = 3

		$elem = angular.element $elem

		$scrollWindow = angular.element($window)
		
		console.log $

		$scrollElem = $("html,body")
		$this = angular.element element

		clear = ->
			clearTimeout $this.data('scrollTimeout') if $this.data('scrollTimeout')
			$this.data('scrollTimeout',null)

		changeIndex = (amount) ->
			if amount
				target_index = scope.slide_index + amount
				target_index = Math.min target_index, last_page
				target_index = Math.max target_index, 0
				scope.slide_index = target_index
			return

		changePage = ->
			current = $scrollWindow.scrollTop()
			target = scope.slide_index * scope.height
			time = 250 * Math.ceil Math.abs (current - target) / scope.height
			$scrollElem.animate 'scrollTop': ('' + target + 'px'), time, clear
			return

		scrollStop = ->
			start = $this.data('scrollStart')
			end = $scrollWindow.scrollTop()
			if end - start > scope.height
				amount_of_pages = Math.round (end-start)/scope.height
			else if end - start > 100
				amount_of_pages = 1
			if end - start < -scope.height
				amount_of_pages = Math.round (end-start)/scope.height
			else if end - start < -100
				amount_of_pages = -1			
			changeIndex(amount_of_pages)
			changePage()
			return
			
		

		$scrollWindow.scroll ->
			if $this.data('scrollTimeout')
				clearTimeout $this.data('scrollTimeout')
			else
				$this.data('scrollStart', $scrollWindow.scrollTop())
			$this.data('scrollTimeout', setTimeout scrollStop, 100, element)

		angular.element($window).bind 'resize', ->
		  scope.setWindowSize()
		  scope.$apply()
		  return

		scope.changePage = changePage
		return
]