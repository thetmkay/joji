directives = angular.module 'directives', [] if !directives

directives.directive 'sloppyNote', [ () ->
	replace: false
	restrict: 'E'
	templateUrl: 'blog/sloppynote'
	link: (scope, elem, attrs) ->
		# note_selector = '.sloppy-note'
		# $target = angular.element elem
		# $content = $target.find('#target-sloppy-note-content')
		# $index = $target.find('#target-sloppy-note-index')
		# $notes = $target.parent().children(note_selector)

		# unescape = (html) ->
		# 	html.replace(/&([#\w]+);/g, (_, n) ->
		# 		n = n.toLowerCase()
		# 		return ':' if (n is 'colon')
		# 		if (n.charAt(0) is '#')
		# 			retVal = String.fromCharCode(+n.substring(1))
		# 			if(n.charAt(1) is 'x')
		# 				retVal = String.fromCharCode(parseInt(n.substring(2), 16))
		# 			return retVal
		# 		return '')

		# angular.forEach $notes, ($note, index) ->
		# 	$note.data('index').data index
		# 	$note.on 'click', () ->
		# 		console.log(unescape($note.data('content')))
		# 		console.log 'hello'
		# 		$content.html unescape($note.data('content'))
		# 		$index.html index
		# 		$target.show()
		# 	return

		return
]
