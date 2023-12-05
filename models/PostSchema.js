const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    caption: {
      type: String
    },
    vibes: {
      type: Array,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });

  const Post = mongoose.model('Post', PostSchema);
  module.exports = Post;