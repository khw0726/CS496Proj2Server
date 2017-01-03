var mongoose = require('mongoose');
var Schema = mongoose.Schema

var picSchema = new Schema({
    //path: String, 
    image: String, 
    //name: String,
    thumbnail: String
});

module.exports = mongoose.model('pic', picSchema);
