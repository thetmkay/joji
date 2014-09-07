var path = require('path'),
	view_dir = "";

exports.setViewDirectory = function(dir) {
	view_dir = dir;
}

exports.index = function(req, res){
	res.render(path.join(view_dir,'index'));
};

exports.partials = function (req, res) {
	var name = req.params.name;
	res.render(path.join(view_dir,'partials', name));
};

exports.blog = function(req, res) {
	console.log("blog");
	var name = req.params.name;
	console.log(name);
	res.render(path.join(view_dir,'blog', name));
};

exports.home = function(req, res) {
	console.log("home");
	var name = req.params.name;
	res.render(path.join(view_dir,'home/', name));
};

exports.common = function(req, res) {
	console.log("common");
	var name = req.params.name;
	res.render(path.join(view_dir,'common', name));
};

exports.slides = function(req, res) {
	var name = req.params.name;
	res.render(path.join(view_dir, 'home', 'slides', name))
};
