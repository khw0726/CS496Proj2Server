// app.js
// The main file for the server

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// var bb = require('express-busboy');
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));

var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
    console.log("Express server started on port " + port);
});

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log('connected to mongod server');
});

mongoose.connect('mongodb://localhost/pics');

var Pic = require("./models/pic");
var Contact = require("./models/contact")
var Joongo = require("./models/joongo")

var router = require('./routes')(app, Pic, Contact, Joongo);
