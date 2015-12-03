var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MasterSchema = new Schema({
  masterUsername: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, select: false},
  games: [{type: Schema.Types.String, ref: 'Game'}],
  dateJoined: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Master', MasterSchema);