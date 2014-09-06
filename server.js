/**
 * Module dependencies
 */

var express = require('express'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

if(process.env.NODE_ENV === 'development') {
  // app.use(express.errorHandler());
}




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

var addRoutes = require('./router');
app.use('/', addRoutes(express.Router()));

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
