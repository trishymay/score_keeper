var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: {type: String, required: true, unique: true},
  masterUsername: {type: Schema.Types.String, ref: 'Master', required: true},
  maxScore: {type: Number, default: 0},
  lowScorePreferred: {type: Boolean, default: false},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Game', GameSchema);