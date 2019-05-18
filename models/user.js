const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({  
  _id: mongoose.Schema.ObjectId,
  name: String,
  email: String
});
module.exports = mongoose.model('User', UserSchema);