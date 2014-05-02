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
		// {"date_shown":
		// 	{
		// 		$lte:date_limit
		// 	}
		// },
		{},
		{
			title:true,
			image:true,
			url:true,
			date_shown: true
		},
		{
			sort:"date_shown"
		},
		callback);
};

exports.addPost = function(post) {
	var criteria = {
		url: post.url
	},
		options = {
			safe: true,
			upsert: true
	};

	db.collection('posts').update(criteria, post, options, function(err,count) {
		if(!err) {
			console.log(count + " documents were successfully updated");
		} else {
			console.err("error adding post");
		}
	});

};

exports.getId = function(callback) {
	db.collection('posts').find({},{id:true}, {sort:'id'}, function(err, cursor) {
		cursor.toArray(function(err,arr) {
			if(arr.length > 0) {
				callback(arr[arr.length-1].id);
			}
			else if(!err) {
				callback(0);
			}
			else {
				console.error(err);
			}
		})
	});
};

//post will have
//id
//title
//url
//content
//image
//date-shown
//date-created
