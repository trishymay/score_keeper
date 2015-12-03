var express = require('express');
var masterRouter = express.Router();
var Master = require('../models/master');
var Player = require('../models/player');
var Score = require('../models/score');
var Game = require('../models/game');

masterRouter.post('/create', function(req, res) {
  var master = new Master();
  master.masterUsername = req.body.masterUsername;
  master.email = req.body.email;
  master.password = req.body.password;
  master.save(function(err) {
    if (err) {
      if (err.code == 11000) return res.send('That username or e-mail is already in use');
      else return res.send(err);
    }
    res.send('Master created!');
  });
});

masterRouter.get('/:masterUsername/games', function(req, res) {
  Master.find({masterUsername: req.params.masterUsername}).populate('games').exec(function(err, master) {
    if (err) return res.send(err);
    res.json(master.games);
  });
});

masterRouter.get('/:masterUsername/players', function(req, res) {
  Player.find({masters: req.params.masterUsername}, 'username email', function(err, players) {
    if (err) return res.send(err);
    res.json(players);
  });
});

masterRouter.route('/:masterUsername')
  .get(function(req, res) {
    Master.find({masterUsername: req.params.masterUsername}, function(err, master) {
      if (err) return res.send(err);
      res.json(master);
    });
  })
  .put(function(req, res) {
    Master.find({masterUsername: req.params.masterUsername}, function(err, master) {
      if (err) return res.send(err);
      if (req.body.email) master.email = req.body.email;
      if (req.body.password) master.password = req.body.password;
      master.save(function(err) {
        if (err) return res.send(err);
        res.json({message: 'Master updated'});
      });
    });
  })
  .delete(function(req, res) {
    Master.findOneAndRemove({masterUsername: req.params.masterUsername}, function(err, master) {
      if (err) return res.send(err);
      res.json({message: 'Master deleted'});
    });
  });

//get scores for all players belonging to specific Master User
masterRouter.get('/all/:masterUsername', function(req, res) {
  Score.find({master: req.params.masterUsername}, function(err, scores) {
    if (err) return res.send(err);
    res.json(scores);
  });
});

//get all scores for one game
masterRouter.get('/all/:masterUsername/:game/scores', function(req, res) {
  Score.find({masterUsername: req.params.masterUsername, game: req.params.game}, function(err, scores) {
    if (err) return res.send(err);
    res.json(scores);
  });
});

//get all players for one game
masterRouter.get('/all/:masterUsername/:game/players', function(req, res) {
  Score.find({masterID: req.params.masterUsername, game: req.params.game}).distinct('username').exec(function(err, scores) {
    if (err) return res.send(err);
    res.json(scores);
  });
});

//get top 10 scores for specific game
masterRouter.get('/all/:masterUsername/:game/topten', function(req, res) {
  Score.find({masterUsername: req.params.masterUsername, game: req.params.game}).sort({score: -1}).limit(10).exec(function(err, scores) {
    if (err) return res.send(err);
    res.json(scores);
  });
});

module.exports = masterRouter;

