var mongo = require('./mongo_api');

exports.setDb = function setDb(dbUrl) {
	var db = require('mongoskin').db(dbUrl, {
		w: 1
	});
	mongo.loadDB(db);
};

exports.getPost = function(req,res) {
	console.log(req.params);
	var postKey = {
		url: req.params.url
	};
	mongo.getPost(postKey, function(err,result) {
		console.log(result);
		res.json(result);
	});
};

exports.getPosts = function(req,res) {
	mongo.getPosts(function(err,result) {
		result.toArray(function(err,result) {
			console.log(result);
			res.json(result);
		});
	});
};

exports.addPost = function(post, callback) {
	mongo.addPost(post);
};

exports.getId = function(callback) {
	mongo.getId(callback);
};
