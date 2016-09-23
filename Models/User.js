var ModelTag = 'User';
var Collection = 'User';
var Mongoose = require('mongoose');
Mongoose.model(ModelTag, new Mongoose.Schema({
    //here definition of a model
    name: String,
    password: String,
    email: String,
    createDate: { type: Date, default: Date.now }
}), Collection);

exports.Tag = ModelTag;
exports.Model = function() {
    return Mongoose.model(ModelTag);
}