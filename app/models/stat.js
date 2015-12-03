var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statSchema = new Schema({
  username: {type: Schema.Types.String, ref: 'Player', required: true},
  game: {type: Schema.Types.String, ref: 'Game', required: true},
  bestScore: {type: Number, default: 0},
  lastScore: Number,
  lastPlayedDate: Date
});

module.exports = mongoose.model('Stat', statSchema);
