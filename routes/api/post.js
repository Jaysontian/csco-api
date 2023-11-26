const express = require('express');
const verifyToken = require('./verifyToken');
const Post = require('../../models/PostSchema');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    if (req.type == "HOME") {
      const posts = await Post.find();
      return res.json( { posts: posts} );
    } else {
      const posts = await Post.find({ userid: req.user.id });
      return res.json( { posts: posts} );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  const newPost = new Post({
    userid: req.user.id,
    imageUrl: req.body.post,
    caption: req.body.caption,
    date: req.body.created_at
  });

  try {
    const savedPost = await newPost.save();
    return res.status(200).json({ message: "Posted successfully", data: newPost }); 
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;