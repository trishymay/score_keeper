var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, select: false},
  lastPlayedDate: Date,
  joinDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Player', PlayerSchema);