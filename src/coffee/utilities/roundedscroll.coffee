changePage = ->
	current = $scrollWindow.scrollTop()
	target = scope.slide_index * scope.height
	time = 250 * Math.ceil Math.abs (current - target) / scope.height
	$scrollElem.animate 'scrollTop': ('' + target + 'px'), time, clear
	return

scrollStop = ->
	start = $this.data('scrollStart')
	end = $scrollWindow.scrollTop()
	amount_of_pages = directionScrolling(start,end)		
	changeIndex(amount_of_pages)
	changePage()
	return
	
roundedScrolling = (start,end,height) ->
	if end - start > height
		return Math.round (end-start)/height
	else if end - start > 100
		return 1
	if end - start < -height
		return Math.round (end-start)/height
	else if end - start < -100
		return -1

scrollStop = ->
	start = $this.data('scrollStart')
	end = $scrollWindow.scrollTop()
	amount_of_pages = directionScrolling(start,end)		
	changeIndex(amount_of_pages)
	changePage()
	return


$scrollWindow.scroll ->
	if $this.data('scrollTimeout')
		clearTimeout $this.data('scrollTimeout')
	else
		$this.data('scrollStart', $scrollWindow.scrollTop())
	$this.data('scrollTimeout', setTimeout scrollStop, 100, element)