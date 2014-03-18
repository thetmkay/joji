directives = angular.module 'joji.directives', [] if !directives

directives.directive 'scrollStop', [() -> 
	restrict: 'A'
	compile: (element,attrs) ->

		console.log 'hello'

		$this = angular.element element

		$.fn.scrollStopped = (callback) ->
			self = this
			$this = $(self)
			element.scroll ->
				clearTimeout $this.data('scrollTimeout') if $this.data('scrollTimeout')
				$this.data('scrollTimeout', setTimeout callback, 250, element)

		return
]