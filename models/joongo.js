var mongoose = require('mongoose');
var Schema = mongoose.Schema

// var Comments = new Schema({
//     author: String,
//     content: String,
// })
var joongoSchema = new Schema({

    thumbnail: String,
    image: String,
    name: String,
    author: String,
    id: String, 
    price: String,
    isNegotiable: Boolean,
    isTaekBae: Boolean,
    isSold: Boolean,
    description: String,
    comments: Array
    // [{
    //     author: String,
    //     content: String,
    // }]
});

module.exports = mongoose.model('joongo', joongoSchema);
