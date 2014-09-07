/**
 * Module dependencies
 */

var express = require('express'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.jade', require('jade').__express);
app.set('view engine', 'jade');
// app.use(logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(app.router);

// development only



/**
 * Routes
 */

var routes = require('./routes/index'),
	api = require('./routes/api'),
		credentials = {};

if(process.env.NODE_ENV === 'development') {

}

if(process.env.NODE_ENV === 'production') {
	credentials.user = process.env.user;
  	credentials.password = process.env.password;
} else {
	var config = require('./config');
  	credentials.user = config.user;
  	credentials.password = config.password;
}

// console.log(credentials);

api.setDb("mongodb://" + credentials.user + ":" + credentials.password + "@troup.mongohq.com:10017/jojidb");

// serve index and view partials
app.get('/common/:name', routes.common);
app.get('/home/:name', routes.home);
app.get('/blog/:name', routes.blog);
app.get('/home/slides/:name', routes.slides)

// JSON API
app.get('/api/getpost/:url', api.getPost);
app.get('/api/getposts', api.getPosts);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);
