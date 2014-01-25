exports.index = function(req, res){
	res.render('index');
};

exports.partials = function (req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
};

exports.blog = function(req, res) {
	console.log("blog");
	var name = req.params.name;
	res.render('blog/' + name);
};

exports.home = function(req, res) {
	console.log("home");
	var name = req.params.name;
	res.render('home/' + name);
};