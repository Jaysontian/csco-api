
const express = require('express');
const verifyToken = require('./verifyToken');
const Post = require('../../models/PostSchema');
const OpenAI = require("openai");
const {ObjectId} = require('mongodb');
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
  const caption = req.body.caption;
  let vibesArr = [];
  if (caption !== "null") {
      const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
          {
              role: "user",
              content: "Give a three adjective prediction for the vibe of an image with the caption: " + caption + ".Note: the format should be three words all lowercase separated by spaces. "}]
      });
      const vibes = response.choices[0].message.content;
      vibesArr = vibes.split(/\W+/).filter(Boolean);
  }
  console.log(vibesArr)
  // const imgUrl = req.body.post;
  // console.log("URRHKJSHKJHKJSH: " + imgUrl)
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4-vision-preview",
  //   messages: [
  //     {
  //       role: "user",
  //       content: [
  //         { type: "text", text: "Describe the vibe of this image in 3 words. Note: the format should be three words all lowercase separated by spaces." },
  //         {
  //           type: "image_url",
  //           image_url: imgUrl,},],},],});
  // console.log("RESP" + response)
  // const vibes = response.choices[0].message.content;
  // const vibesArr = vibes.split(/\W+/).filter(Boolean);
  // console.log(vibesArr);

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

router.delete('/', verifyToken, async (req, res) => {
  try {
    if (req.type == "DEL") {
      const post = Post.deleteOne({ _id: new ObjectId(req.del_id) })
        .then(result => {
          console.log("Delete successful", result.deletedCount);
          return res.status(200).json({ message: "Delete Sucessful" });
        })
        .catch(err => {
          console.error("Delete failed", err);
          return res.status(500).json({ message: err.message });
        });
    }
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;