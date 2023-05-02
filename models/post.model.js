
const mongoose = require('mongoose');

let postSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
});

const Post=mongoose.model('Post',postSchema);

module.exports = { Post }

// posts created