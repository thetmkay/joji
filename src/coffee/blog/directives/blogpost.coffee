directives = angular.module 'joji.directives', [] if !directives

directives.directive 'blogPost', ['getPostService', '$stateParams', (getPostService, $stateParams) ->
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

		getPostService.getPost($stateParams.posturl).then (post)=>
			postContent  = "<p>Hello my name is George and this is something I'm really passionate <a href='www.bbc.com'>about</a></p><p>Although the truth of the matter is that abladfjklasjdkfl; lksdjfklasks sljf akjsdfa lsjfkldsljkafks lkaskjdfklj</p>"
			element.find("#postContent").html(postContent)
			element.find("#postTitle").html(post.title)
			_linkSloppyNotes()
			return
		return
]
