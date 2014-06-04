services = angular.module 'joji.services', [] if !services

services.service 'getHomePageService', ['$timeout',($timeout) ->

	image_urls = [
		'http://i.imgur.com/dy6fjv7.jpg',
		'http://i.imgur.com/peGDea9.jpg',
		'http://i.imgur.com/jW9mz9D.jpg',
		'http://i.imgur.com/C2pkoGI.jpg'
	]

	this.loadImages = (callback) ->
		images = [];
		image_urls.forEach (element, index) ->
			images.push(new Image())
			images[index].src = element
			return
		$timeout(callback, 3000)
		return

	developer =
		text: 'am a developer'
		color: '#111'
		bg: 'transparent'
		dialogbg:'transparent'
		url: 'http://www.github.com/thetmkay'
		linktext: 'check out my github'
		opacity: 0

	griffin =
		text: 'help build robots'
		color: '#FFF'
		bg: '#fff center center/cover url(' + image_urls[0] + ') no-repeat'
		dialogbg:'#000'
		url: 'http://www.griffins1884.com'
		linktext: 'learn about the Griffins'
		opacity: 0.5

	lfc =
		text: 'support Liverpool FC'
		color: '#FFF'
		bg: '#fff center center/cover url(' + image_urls[1] + ') no-repeat'
		dialogbg:'#8A1722'
		linktext: 'photo by RuaraidhG'
		url: 'https://www.flickr.com/photos/ruaraidhg/'
		opacity: 0.2

	ultimate =
		text: 'play ultimate'
		color: '#fff'
		bg: '#fff center center/cover url(' + image_urls[2] + ') no-repeat'
		dialogbg:'#001F3F'
		url: 'http://www.twitter.com/icdiscdoctors'
		linktext: 'follow the discDoctors'
		opacity: 0.1

	onigiris =
		text: 'love onigiris'
		color: '#fff'
		bg: '#fff center top/cover url(' + image_urls[3] + ') no-repeat'
		dialogbg:'#3A3B3C'
		url: false
		opacity: 0.25

	pages = [developer,onigiris, griffin, lfc, ultimate]
	index = 0

	this.getPage = () ->
		return pages[index]

	this.getNextPage = () ->
		index++
		index %= pages.length
		return pages[index]

	return this
]
