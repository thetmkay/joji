services = angular.module 'joji.services', [] if !services

services.service 'linkPostService', [() ->
	this.setSloppyNotesLinkFn = (linkFn) ->
		this.linkSloppyNotes = linkFn
		return
	return this
]