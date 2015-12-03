var express = require('express');
var adminRouter = express.Router();
var Score = require('../models/score');
var Game = require('../models/game');
var Master = require('../models/master');
var Player = require('../models/player');
var Stat = require('../models/stat');

//get all scores
adminRouter.get('/scores', function(req, res) {
  Score.find(function(err, scores) {
    if (err) return res.send(err);
    res.json(scores);
  });
});

adminRouter.get('/masters', function(req, res) {
  Master.find(function(err, masters) {
    if (err) return res.send(err);
    res.json(masters);
  });
});

adminRouter.get('/players', function(req, res) {
  Player.find(function(err, players) {
    if (err) return res.send(err);
    res.json(players);
  });
});

//get all games
adminRouter.get('/games', function(req, res) {
  Game.find(function(err, games) {
    if (err) return res.send(err);
    res.json(games);
  });
});

//get all stats
adminRouter.get('/:stats', function(req, res) {
  Stat.find(function(err, stats) {
    if (err) return res.send(err);
    res.json(stats);
  });
});

module.exports = adminRouter;