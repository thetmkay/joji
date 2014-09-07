var path = require('path');

exports.index = function(req, res){
	res.render('index');
};

exports.partials = function (req, res) {
	var name = req.params.name;
	res.render(path.join('partials', name));
};

exports.blog = function(req, res) {
	console.log("blog");
	var name = req.params.name;
	console.log(name);
	res.render(path.join('blog', name));
};

exports.home = function(req, res) {
	console.log("home");
	var name = req.params.name;
	res.render(path.join('home/', name));
};

exports.common = function(req, res) {
	console.log("common");
	var name = req.params.name;
	res.render(path.join('common', name));
};

exports.slides = function(req, res) {
	var name = req.params.name;
	res.render(path.join('home', 'slides', name))
};
