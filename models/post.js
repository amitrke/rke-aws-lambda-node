const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: 'string',
  description: 'string',
  fulltext: 'string',
  images: ['string'],
  author: 'string',
  created: Date,
  status: 'string',
  webid: 'string'
});

module.exports = mongoose.model('Post', PostSchema);