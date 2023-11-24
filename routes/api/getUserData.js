const express = require('express');
const verifyToken = require('./verifyToken');
const User = require('./models/User'); // Assuming you have a User model
const Post = require('./models/Post'); // Assuming you have a Post model
const app = express();

app.get('/user-page', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const posts = await Post.find({ user: userId });
    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = app;
