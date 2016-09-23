var dbUrl = require('../config').dbUrl;
var mongoose = require('mongoose');
var admin = mongoose.mongo.admin

exports.connect = function() {
    mongoose.connect(dbUrl);
}

exports.getMongo = function() { return mongoose; }