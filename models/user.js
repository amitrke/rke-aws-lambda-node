const mongoose = require('mongoose');

var socialSchema = new mongoose.Schema({ id: 'string', type: 'string', email: 'string', profilePic: 'string'});

const UserSchema = new mongoose.Schema({
  name: 'string',
  type: 'string',
  created: Date,
  lastLogin: Date,
  social: [socialSchema],
  webid: 'string'
});

module.exports = mongoose.model('User', UserSchema);