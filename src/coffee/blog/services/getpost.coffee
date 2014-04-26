services = angular.module 'joji.services', [] if !services

services.service 'getPostService', ['$http', '$q', ($http, $q) ->
	_post = {}
	_deferred = undefined

	this.getPost = (url) =>
		if url isnt _post.url
			this.testPageContent url
		return _deferred.promise
			
	this.retrievePostData = (url) =>
		_deferred = $q.defer()
		_post.url = url
		#TODO deal with error case
		$http.get('/api/getpost/' + url).success (data,status) =>
			console.log 'retrieved'
			_post = 
				url: data.url
				content: data.content
				title: data.title
				prev_url: data.prev_url
				prev_title: data.prev_title
				next_url: data.next_url
				next_title: data.next_title

			_deferred.resolve(_post);
		return
	return this
]
