services = angular.module 'joji.services', [] if !services

services.service 'brainService', ['$location',($location) ->

	_base_url = "http://www.georgenishimura.com"

	this.setUrl = (_url) ->
		# if(!new_url)
		# 	new_url = "";
		_url = _base_url + _url
		angular.element('head meta#meta-url').attr('content', _url)

	this.setTitle = (_title) ->
		angular.element('head meta#meta-title').attr('content', _title)
		angular.element('head title#head-title').text(_title)

	this.setImage = (_image) ->
		angular.element('head image#meta-image').attr('content', _image)

	return this
]
