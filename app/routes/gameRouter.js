var express = require('express');
var gameRouter = express.Router();
var Game = require('../models/game');
var Master = require('../models/master');

//get all games for one specific Master User
gameRouter.get('/all/:masterUsername', function(req, res) {
  Game.find({masterUsername: req.params.masterUsername}, 'name -_id', function(err, games) {
    if (err) return res.send(err);
    res.json(games);
  });
});

//create a new game
gameRouter.post('/create', function(req, res) {
  var game = new Game();
  game.name = req.body.name;
  game.masterUsername = req.body.masterUsername;
  if (req.body.maxScore)
    game.maxScore = req.body.maxScore;
  if (req.body.lowScorePreferred)
    game.lowScorePreferred = req.body.lowScorePreferred;
  game.save(function(err) {
    if (err) return res.send(err);
    Master.findOne({masterUsername: req.body.masterUsername}, function(err, master) {
      master.games.push(game.name);
      master.save(function(err) {
        if (err)
          return res.send(err);
        res.json({message: 'New Game Created!'});
      });
    });
  });
});

module.exports = gameRouter;
