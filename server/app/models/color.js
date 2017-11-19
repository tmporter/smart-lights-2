var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model(
    'Color',
    new Schema({
        name: String,
        value: String
    })
);