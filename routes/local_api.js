var db;

var path = require('path'),
	fs = require('fs');

exports.setDb = function (database) {
	//readjson files
	db = {};
	db.directory = "/Users/George/Projects/blog-posts/posts/json";
};

exports.getPost = function (req, res) {
	res.json(readJSON(req.params.url + ".json"));
};

exports.getPosts = function(req,res) {
	var files = fs.readdirSync(db.directory);
	var jsons = [];
	for(var i in files) {
		if(/[a-z\-]*\.json$/.test(files[i])) {
			jsons.push(readJSON(files[i]));
		}
	}

	console.log(jsons);

	res.json(jsons);
};

var readJSON = function(filename) {
	var json_file_path = path.join(db.directory,filename);

	var post = fs.readFileSync(json_file_path, {encoding:'utf8'});

	return JSON.parse(post);
}
