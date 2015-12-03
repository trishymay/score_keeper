var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var port = process.env.PORT || 8000;
var masterRouter = require('./app/routes/masterRouter');
var adminRouter = require('./app/routes/adminRouter');
var playerRouter = require('./app/routes/playerRouter');
var gameRouter = require('./app/routes/gameRouter');
var path = require('path');

mongoose.connect('mongodb://localhost:27017/awesomeDatabase');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/master', masterRouter);
app.use('/admin', adminRouter);
app.use('/game', gameRouter);
app.use('/player', playerRouter);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port);
console.log('Magic happens on port ' + port);
