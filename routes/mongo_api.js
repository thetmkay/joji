var db;

exports.loadDB = function (database) {
	db = database;
};

exports.getPost = function (postKey, callback) {
	console.log('postKey');
	console.log(postKey);
	var collection = db.collection('posts');

	collection.findOne(postKey, function(err,result) {
		if(!result)
			return result;

		var data = result;

		//find previous
		db.collection('posts').findOne({id: (data.id - 1)}, function(error, prev) {
			if(prev) {
				data.prev_url = prev.url;
				data.prev_title = prev.title;
				console.log("prev");
			}
			//find next
			collection.findOne({id: (data.id + 1)}, function(error, next) {
				if(next) {
					data.next_url = next.url;
					data.next_title = next.title;
				}

				callback(err,data);
			});
		});
	});
};

exports.getPosts = function(callback) {
	console.log('getting posts');
	posts = [
		{
			title: 'My first day on the job',
			url: 'my-first-day-on-the-job',
			tldr: 'a summary of the things that went on my first day',
			image: '/img/desert.jpg',
			date: '09/04/14',
			author: 'GN',
			color: 'red',
			text_color: 'white'
		},
		{
			title: 'This is a test',
			url: 'this-is-a-test',
			tldr: 'blah blah blah blah blah blah',
			image: '/img/sandboxlarge.jpg',
			date: '08/04/14',
			author: 'GN',
			color: 'blue',
			text_color: 'white'
		},
		{
			title: 'What a wonderful world this is when the titles are longer than they should be',
			url: 'hello-world',
			tldr: 'poetry in motion tralalalalalalalallalalalalalalalaallalalalalalla',
			image: '/img/sandboxmedium.jpg',
			date: '10/04/14',
			author: 'GN',
			color: 'black',
			text_color: 'white'
		}
	];
	callback({},posts);
}
