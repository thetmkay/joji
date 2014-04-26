services = angular.module 'joji.services', [] if !services

services.service 'getPostsService', ['$http', '$q', ($http, $q) ->
	_posts = []
	_deferred = undefined

	this.getPosts = () =>
		_deferred = $q.defer()
		$http.get('/api/getposts/').success (data,status) =>
			console.log 'posts'
			console.log data
			_posts = data
			_deferred.resolve(_posts);
		return _deferred.promise
	return this
]