directives = angular.module 'joji.directives', [] if !directives

directives.directive 'blogPost', ['postalService', '$stateParams', (postalService, $stateParams) -> 
	restrict: 'E'
	scope: true
	replace: false
	templateUrl: 'blog/post'
	link: (scope,element,attrs) ->

		note_selector = '.sloppy-note'

		$parent = angular.element element.context.parentNode
		$elem = angular.element element
		_linkSloppyNotes = () ->
			$target = $parent.find('sloppy-note')
			$content = $target.find('#target-sloppy-note-content')
			$index = $target.find('#target-sloppy-note-index')
			$notes = element.find(note_selector)
			console.log($notes)
			angular.forEach $notes, (note, index) ->
				$note = angular.element note
				$note.data 'index', index
				$note.on 'click', () ->
					$content.html $note.data('content')
					$index.html index
					$target.show()
				return
			return

		postalService.getPost($stateParams.posturl).then (post)=>
			postContent  = '<a class="sloppy-note" data-content="hihihih">yoyoyo</div>'
			element.find("#postContent").html(postContent)
			element.find("#postTitle").html(post.title)
			_linkSloppyNotes()
			return
		return
]