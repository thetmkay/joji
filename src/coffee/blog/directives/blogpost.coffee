directives = angular.module 'joji.directives', [] if !directives

directives.directive 'blogPost', ['getPostService', '$stateParams', 'brainService', (getPostService, $stateParams, brainService) ->
	restrict: 'E'
	scope: true
	replace: false
	templateUrl: 'blog/post'
	link: (scope,element,attrs) ->

		note_selector = '.sloppy-note'

		$elem = $(element)
		$parent = $elem.parent()


		_unescape = (html) ->
			# console.log(html);
			return $('<div/>').html(html).text();

		_linkSloppyNotes = () ->
			$target = $parent.find('sloppy-note')
			$content = $target.find('#target-sloppy-note-content')
			# console.log($content)
			# $index = $target.find('#target-sloppy-note-index')
			$notes = $elem.find(note_selector)
			# console.log($notes)
			angular.forEach $notes, (note, index) ->
				$note = angular.element note
				# $note.data 'index', index
				$note.on 'click', () ->
					# console.log('click')
					$this = angular.element this
					$target = $('sloppy-note')
					$content = $('#target-sloppy-note-content')
					if($content.data('index') isnt index)
						$target.show()
						$content.html($this.data('content'))
						console.log('note content' + $note.data('content'))
						$content.data('index', index)
					else
						$target.toggle()
				console.log('end for each')
				return
			return


		getPostService.getPost($stateParams.posturl).then (post)=>
			# postContent  = "<p>Hello my name is George and this is something I'm really passionate <a href='www.bbc.com'>about</a></p><p>Although the truth of the matter is that abladfjklasjdkfl; lksdjfklasks sljf akjsdfa lsjfkldsljkafks lkaskjdfklj</p>"
			element.find("#postContent").html(post.content)
			element.find("#postTitle").html(post.title)
			scope.img_header = post.image;
			_linkSloppyNotes()
			brainService.setTitle('Blog | ' + post.title)
			brainService.setImage(post.image)
			brainService.setUrl('/blog/post/' + post.url);
			return
		return
]
