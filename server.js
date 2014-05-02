/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  credentials = {};

var app = module.exports = express();

if(process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler());
  var config = require('./config');
  credentials.user = config.user;
  credentials.password = config.password;
}

if(process.env.NODE_ENV === 'production') {
	credentials.user = process.env.user;
  	credentials.password = process.env.password;
}

console.log(credentials);

api.setDb("mongodb://" + credentials.user + ":" + credentials.password + "@troup.mongohq.com:10017/jojidb");

// console.log(process.env);




/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only



/**
 * Routes
 */

// serve index and view partials
app.get('/home/:name', routes.home);
app.get('/blog/:name', routes.blog);
app.get('/home/slides/:name', routes.slides)

// JSON API
app.get('/api/getpost/:url', api.getPost);
app.get('/api/getposts', api.getPosts);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
