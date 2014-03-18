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
			$scope.$apply()
			return
		this.getIndex = ->
			$scope.slide_index
		return
	link: (scope,element,attrs) ->

		$this = angular.element element

		console.log(element)
		scope.setWindowSize = ->
			scope.height = $window.innerHeight
			scope.width  = $window.innerWidth
			$this.height(scope.height)
			$this.width(scope.width)
			stayOnPage()
			return
		
		last_page = 3

		scroll_pos = 0
		# is_scrolling = false

		$this.data('scrolling', 0)

		clear = ->
			clearTimeout $this.data('scrollTimeout') if $this.data('scrollTimeout')
			$this.data('scrollTimeout',null)

		# enableScrolling = ->
		# 	is_scrolling = false
		# 	# scroll_pos = $this.scrollTop()
		# 	# $this.css
		# 	# 	    'overflow': 'auto'
		# 	# $this.data('scrolling', 0)

		

		# finishedScrolling = ->
		# 	console.log 'finished scrolling'
		# 	setTimeout enableScrolling, 250, element

		changeIndex = (amount) ->
			if amount
				target_index = scope.slide_index + amount
				target_index = Math.min target_index, last_page
				target_index = Math.max target_index, 0
				scope.slide_index = target_index
				scope.$apply()
			else
				changePage()
			return

		# scrollToPage = ->
		# 	console.log 'scroll to page'
		# 	target = scope.slide_index * scope.height
		# 	$this.animate 'scrollTop': ('' + target + 'px'), 250, finishedScrolling

		# directionScrolling = (start,end) ->
		# 	if end - start > 0
		# 		return 1
		# 	else if end - start < 0
		# 		return -1
		# 	else
		# 		return 0

		changePage = ->
			current = $this.scrollTop()
			target = scope.slide_index * scope.height
			time = 250 * Math.ceil Math.abs (current - target) / scope.height
			$this.animate 'scrollTop': ('' + target + 'px'), time, clear
			return

		stayOnPage = ->
			target = scope.slide_index * scope.height
			$this.scrollTop(target)
			return
			
		roundedScrolling = (start,end,height) ->
			if end - start > height
				return Math.round (end-start)/height
			else if end - start > 100
				return 1
			if end - start < -height
				return Math.round (end-start)/height
			else if end - start < -100
				return -1
			return 0

		scrollStop = ->
			start = $this.data('scrollStart')
			end = $this.scrollTop()
			amount_of_pages = roundedScrolling(start,end, scope.height)	
			changeIndex(amount_of_pages)
			return

		$this.scroll ->
			if $this.data('scrollTimeout')
				clearTimeout $this.data('scrollTimeout')
			else
				$this.data('scrollStart', $this.scrollTop())
			$this.data('scrollTimeout', setTimeout scrollStop, 100, element)

		angular.element($window).bind 'resize', ->
		  scope.setWindowSize()
		  scope.$apply()
		  return

		angular.element($window).bind 'keydown', (event) ->
			event.stopPropagation()
			changeIndex(1) if event.which is 40 or event.which is 34
			changeIndex(-1) if event.which is 38 or event.which is 33

		scope.$watch 'slide_index', ->
			changePage()

		scope.setWindowSize()

		return
]