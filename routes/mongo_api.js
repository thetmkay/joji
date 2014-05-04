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
	var date_limit = new Date().getTime()
	db.collection('posts').find(
		// {"shown_date":
		// 	{
		// 		$lte:date_limit
		// 	}
		// },
		{},
		{
			title:true,
			image:true,
			url:true,
			shown_date: true
		},
		{
			sort:"shown_date"
		},
		callback);
};

//post will have
//id
//title
//url
//content
//image
//date-shown
//date-created
