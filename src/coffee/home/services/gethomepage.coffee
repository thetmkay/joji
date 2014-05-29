services = angular.module 'joji.services', [] if !services

services.service 'getHomePageService', [() ->

	image_urls = [
		'https://farm3.staticflickr.com/2896/14085436883_38cf596d70_b.jpg',
		'https://farm4.staticflickr.com/3784/11276270996_ad307bfb5d_h.jpg',
		'http://i.imgur.com/ogqWv1E.jpg',
		'http://i.imgur.com/PvjQiCq.jpg'
	]

	this.loadImages = () ->
		images = [];
		image_urls.forEach (element, index) ->
			images.push(new Image())
			images[index].src = element
			return
		return

	developer = 
		text: 'am a developer',
		color: '#111',
		highlight: '#ECC850'
		bg: 'transparent',
		dialogbg:'transparent',
		url: 'http://www.github.com/thetmkay'
		linkclass: 'dark-theme'

	griffin = 
		text: 'help build robots',
		color: '#FFF',
		highlight: '#8A1722'
		bg: '#fff left top/cover url(' + image_urls[0] + ') no-repeat',
		dialogbg:'#000',
		url: 'http://www.griffins1884.com'
		linkclass: 'dark-theme'

	lfc = 
		text: 'support Liverpool FC',
		color: '#FFF',
		highlight: '#574D72'
		bg: '#fff left top/cover url(' + image_urls[1] + ') no-repeat',
		dialogbg:'#8A1722',
		linkclass: 'dark-theme',
		attribution: 'photo by Ruaraidh Gillies'

	ultimate = 
		text: 'play ultimate',
		color: '#fff',
		highlight: '#EF4140'
		bg: '#fff left top/cover url(' + image_urls[2] + ') no-repeat' ,
		dialogbg:'#574D72',
		url: 'http://www.twitter.com/icdiscdoctors'
		linkclass: 'dark-theme'

	onigiris = 
		text: 'love onigiris',
		color: '#fff',
		highlight: '#18A08C'
		bg: '#fff left top/cover url(' + image_urls[3] + ') no-repeat' ,
		dialogbg:'#3A3B3C',
		url: 'http://www.twitter.com/icdiscdoctors'
		linkclass: 'dark-theme'

	pages = [developer,griffin, lfc, ultimate, onigiris]
	index = 0

	this.getPage = () ->
		return pages[index]

	this.getNextPage = () ->
		index++
		index %= pages.length
		return pages[index]

	return this
]