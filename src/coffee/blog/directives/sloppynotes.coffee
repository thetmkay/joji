directives = angular.module 'directives', [] if !directives

directives.directive 'sloppyNote', [ () ->
	replace: false
	restrict: 'E'
	templateUrl: 'blog/sloppynote'
	link: (scope, elem, attrs) ->
		note_selector = '.sloppy-note'
		$target = angular.element elem
		$content = $target.find('#target-sloppy-note-content')
		$index = $target.find('#target-sloppy-note-index')
		$notes = $target.parent().children(note_selector)

		angular.forEach $notes, ($note, index) ->
			$note.data('index').data index
			$note.on 'click', () ->
				$content.html $note.data('content')
				$index.html index
				$target.show()
		return

]
