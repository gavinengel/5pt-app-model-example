var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HegelSchema = new Schema({
  thought: String,
  negative: String,
  doublenegative: String,
  synthesis: String,
  tense: String,
  ts: Date
});

module.exports = mongoose.model('Hegel', HegelSchema);
