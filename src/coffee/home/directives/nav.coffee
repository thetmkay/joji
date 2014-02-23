directives = angular.module 'joji.directives', [] if !directives

directives.directive 'homeSlideShowNav', [ () ->
	templateUrl: 'home/slidenav'
	replace: true
	restrict: 'E'
	require: ['^homeSlide','^homeSlideShow']
	scope: true
	link: (scope, element, attributes, parentCtrls) ->
		$elem = angular.element element
		$elem.children().each (index,navLink) ->
			$navLink = angular.element navLink
			if index is parentCtrls[0].slideIndex
				$navLink.addClass 'full-opacity'
			$navLink.on 'click', ->
				console.log 'click'
				parentCtrls[1].changeIndex(index)
				return
			return
		return

]