services = angular.module 'joji.services', [] if !services

services.service 'getPostsService', ['$http', '$q','$filter', ($http, $q, $filter) ->
	_posts = []
	_deferred = undefined

	this.getPosts = () =>
		_deferred = $q.defer()
		$http.get('/api/getposts/').success (data,status) =>
			_posts = data#$filter('orderBy')(data,'shown_date',true)
			console.log(_posts)
			_deferred.resolve(_posts);
		return _deferred.promise
	return this
]
