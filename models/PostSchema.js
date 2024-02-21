// schema for posts

const mongoose = require('mongoose');

// defines Post model and required fields
const PostSchema = new mongoose.Schema({
    userid: { // user's id
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    imageUrl: { // url to posted image
      type: String,
      required: true
    },
    caption: { // caption for image
      type: String
    },
    vibes: { // AI generated vibe words
      type: Array,
      required: true
    },
    created_at: { // date posted
      type: Date,
      default: Date.now
    }
  });

  const Post = mongoose.model('Post', PostSchema); // export it as schema for MongoDb
  module.exports = Post;