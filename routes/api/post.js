
const express = require('express');
const verifyToken = require('./verifyToken');
const Post = require('../../models/PostSchema');
const OpenAI = require("openai");
const router = express.Router();
require('dotenv').config();

const openai = new OpenAI({apiKey: process.env.API_KEY})

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
  const imgUrl = req.body.post;
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe the vibe of this image in 3 words. Note: the format should be three words all lowercase separated by spaces." },
          {
            type: "image_url",
            image_url: {
              "url": imgUrl,
            },},],},],});
  const vibes = response.choices[0].message.content;
  const vibesArr = vibes.split(/\W+/).filter(Boolean);
  console.log(vibesArr);

  const newPost = new Post({
    userid: req.user.id,
    imageUrl: req.body.post,
    caption: req.body.caption,
    vibes: vibesArr,
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