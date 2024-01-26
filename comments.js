// create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// read json file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// set port
app.set('port', (process.env.PORT || 3000));

// set static path
app.use(express.static(__dirname + '/public'));

// get comments
app.get('/api/comments', function(req, res) {
    res.json(comments);
});

// add comments
app.post('/api/comments', function(req, res) {
    var newComment = {
        id: Date.now(),