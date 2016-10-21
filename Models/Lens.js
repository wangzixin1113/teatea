var ModelTag = 'Lens';
var Collection = 'Lens';
var Mongoose = require('mongoose');
Mongoose.model(ModelTag, new Mongoose.Schema({
    name: String,
    src: String,
    tag: [String],
    price: Number,
    days: [{ price: Number, sales: Number, date: Date }],
    id: String,
    source: String,
    created: { type: Date },
    edited: { type: Date, default: Date.now }
}), Collection);

exports.Tag = ModelTag;
exports.Model = function() {
    return Mongoose.model(ModelTag);
}