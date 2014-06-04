directives = angular.module 'joji.directives', [] if !directives

directives.directive 'cascadeStream', ['$window', ($window) ->
	restrict: 'E'
	scope: true
	replace: false
	templateUrl: 'home/cascadestream'
	link: (scope,element,attrs) ->
		console.log Modernizr
		if($window.innerWidth >= 400)
			angular.element('document').cascadeStream()
			$wind = angular.element($window)
			$wind.on 'scroll', () ->
				console.log $wind.scrollTop()
				scroll_pos = $wind.scrollTop() + $window.innerHeight;
				angular.element('.cs-block').each () ->
					$this = angular.element(this)
					this_pos = $this.offset().top
					if(scroll_pos > this_pos + 200)
						$this.click()


		# angular.element('.cs-block').on 'click', () ->
		# 	$this = angular.element(this)
		# 	console.log $this.position()
		# 	scroll_pos =  $this.position().top - $window.innerHeight + $this.height() + 100;
		# 	angular.element('html,body').animate(
		# 		scrollTop: scroll_pos
		# 	)
		# 	angular.element(this).off 'click'

		$elem = angular.element(element)

		return

]
