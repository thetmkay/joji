services = angular.module 'joji.services', [] if !services

services.service 'linkPostalService', [() ->
	this.setSloppyNotesLinkFn = (linkFn) ->
		this.linkSloppyNotes = linkFn
		return
	return this
]