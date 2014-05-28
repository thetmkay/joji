services = angular.module 'joji.services', [] if !services

services.service 'getHomePageService', [() ->
	developer = 
		text: 'am a developer',
		color: '#111',
		highlight: '#ECC850'
		bg: 'transparent',
		dialogbg:'transparent',
		url: 'http://www.github.com/thetmkay'

	griffin = 
		text: 'help build robots',
		color: '#FFF',
		highlight: '#000'
		bg: 'transparent',
		dialogbg:'#000',
		url: 'http://www.griffins1884.com'

	lfc = 
		text: 'support Liverpool FC',
		color: '#FFF',
		highlight: '#8A1722'
		bg: 'transparent',
		dialogbg:'#8A1722',
		url: 'http://www.liverpoolfc.com'

	ultimate = 
		text: 'play ultimate',
		color: '#111',
		highlight: '#ECC850'
		bg: 'transparent',
		dialogbg:'#0074D9',
		url: 'http://www.twitter.com/icdiscdoctors'

	pages = [developer,griffin, lfc, ultimate]
	index = 0

	this.getPage = () ->
		return pages[index]

	this.getNextPage = () ->
		index++
		index %= pages.length
		return pages[index]

	return this
]