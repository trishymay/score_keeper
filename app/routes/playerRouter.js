var express = require('express');
var playerRouter = express.Router();
var Player = require('../models/player');
var Stat = require('../models/stat');
var Score = require('../models/score');

playerRouter.post('/create', function(req, res) {
  var player = new Player();
  player.username = req.body.username;
  player.email = req.body.email;
  player.password = req.body.password;
  player.save(function(err) {
    if (err) {
      if (err.code == 11000) return res.send('That username or e-mail is already in use');
      else return res.send(err);
    }
    res.json({message: 'Player created!'});
  });
});

playerRouter.get('/:username/games', function(req, res) {
  Stat.find({player: req.params.username}, 'game -_id', function(err, stat) {
    if (err) return res.send(err);
    res.json(stat);
  });
});

playerRouter.route('/:username')
  .get(function(req, res) {
    Player.find({username: req.params.username}, function(err, player) {
      if (err) return res.send(err);
      res.json(player);
    });
  })
  .put(function(req, res) {
    Player.findById(req.params.username, function(err, player) {
      if (err) return res.send(err);
      if (req.body.email)
        player.email = req.body.email;
      if (req.body.password)
        player.password = req.body.password;
      player.save(function(err) {
        if (err) return res.send(err);
        res.json({message: 'Player updated'});
      });
    });
  })
  .delete(function(req, res) {
    Player.remove({username: req.params.username}, function(err, player) {
      if (err) return res.send(err);
      res.json({message: 'Player deleted'});
    });
  });

  playerRouter.post('/score', function(req, res) {
    var score = new Score();
    score.game = req.body.game;
    score.master = req.body.master;
    score.score = req.body.score;
    score.username = req.body.username;
    score.save(function(err) {
      if (err) return res.send(err);
      Stat.findOne({username: req.body.username, game: req.body.game}, function(err, stat) {
        if (err) return res.send(err);
        if (!stat) {
          var stat = new Stat();
          stat.username = req.body.username;
          stat.game = req.body.game;
          stat.bestScore = req.body.score;
        } else {
          if (stat.bestScore < req.body.score)
            stat.bestScore = req.body.score;
        }
        stat.lastScore = req.body.score;
        stat.lastPlayedDate = Date.now();
        stat.save(function(err) {
          if (err) return res.send(err);
          Player.findOneAndUpdate({username: req.body.username}, {lastPlayedDate: Date.now()}, function(err, player){
            if (err) return res.send(err);
            res.json({message: 'Score saved'});
          });
        });
      });
    });
  });

module.exports = playerRouter;
