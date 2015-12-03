var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
  username: {type: Schema.Types.String, ref: 'Player', required: true},
  game: {type: Schema.Types.String, ref: 'Game', required: true},
  masterUsername: {type: Schema.Types.String, ref: 'Master', required: true},
  score: {type: Number, required: true},
  date: {type: Date, default: Date.now}
});

ScoreSchema.pre('save', function(next) {
  var score = this;
  console.log(score.username);
  next();
});

module.exports = mongoose.model('Score', ScoreSchema);