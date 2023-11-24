const express = require('express');
const Post = require('../../models/PostSchema');
const router = express.Router();

router.post('/', async (req, res) => {
  const newPost = new Post({
    user: req.body.user,
    imageUrl: req.body.imageUrl,
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