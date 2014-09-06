module.exports = function(router, view_dir) {

	var path = require('path'),
		routes = require('./routes/index'),
		api = require('./routes/api'),
  		credentials = {};

	if(process.env.NODE_ENV === 'development') {
	  var config = require('./config');
	  credentials.user = config.user;
	  credentials.password = config.password;
	}

	if(process.env.NODE_ENV === 'production') {
		credentials.user = process.env.user;
	  	credentials.password = process.env.password;
	}

	// console.log(credentials);

	api.setDb("mongodb://" + credentials.user + ":" + credentials.password + "@troup.mongohq.com:10017/jojidb");

	routes.setViewDirectory(view_dir);

	// serve index and view partials
	router.get('/common/:name', routes.common);
	router.get('/home/:name', routes.home);
	router.get('/blog/:name', routes.blog);
	router.get('/home/slides/:name', routes.slides)

	// JSON API
	router.get('/api/getpost/:url', api.getPost);
	router.get('/api/getposts', api.getPosts);

	// redirect all others to the index (HTML5 history)
	router.get('*', routes.index);

	return router;
};
