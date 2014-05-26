directives = angular.module 'joji.directives', [] if !directives

directives.directive 'cascadeStream', [() ->
	restrict: 'E'
	scope: true
	replace: false
	templateUrl: 'home/cascadestream'
	link: (scope,element,attrs) ->
		
		if(!Modernizr.touch)
			angular.element('document').cascadeStream()

		$elem = angular.element(element)
		$elem.find('#bio-content').click ()->
			console.log 'click'
			$(this).find('.bio-part').addClass('bio-expanded')
			$(this).find('.bio-arrow i').addClass('fa-arrow-down')
			$(this).find('.bio-arrow i').removeClass('fa-arrow-right')
			$(this).unbind('click')
		return

]
