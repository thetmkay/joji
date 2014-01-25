var db;

exports.setDb = function setDb(dbUrl) {
	db = require('mongoskin').db(dbUrl, {
		w: 1
	});
}

exports.name = function(req,res) {

};