// handles posting (for images uploaded as urls), deleting, and retreiving posts

const express = require('express');
const verifyToken = require('./verifyToken');
const Post = require('../../models/PostSchema');
const OpenAI = require("openai");
const {ObjectId} = require('mongodb');
const router = express.Router();
require('dotenv').config();

const openai = new OpenAI({apiKey: process.env.API_KEY}) // creates open ai instance with api key from env

// retreving posts
router.get('/', verifyToken, async (req, res) => { // verify token to determine current user
  try {
    // if home page: return all posts
    if (req.type == "HOME") {
      const posts = await Post.find();
      return res.json( { posts: posts} );
    } 
    // if specific user: return only that users posts
    else {
      const posts = await Post.find({ userid: req.user.id });
      return res.json( { posts: posts} );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// posting (for images uploaded as URLs)
  // for images uploaded as files, go to upload.js
router.post('/', verifyToken, async (req, res) => { // verify token to determine current user
  const caption = req.body.caption;
  let vibesArr = [];
  if (caption !== "null") {
    // request Open AI Chat Compleion's API to generate vibe adjectives based on image caption
      const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
          {
              role: "user",
              content: "Give a three adjective prediction for the vibe of an image with the caption: " + caption + ".Note: the format should be three words all lowercase separated by spaces. "}]
      });
      const vibes = response.choices[0].message.content; // get vibe string from gpt response
      vibesArr = vibes.split(/\W+/).filter(Boolean); // split vibe string into array
  }
  console.log(vibesArr)

  // GENERATE VIBES DIRECT FROM IMAGE (GPT 4 Vision Preview API) -> API was temporarily broken
  /*
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
            image_url: imgUrl,},],},],});
  const vibes = response.choices[0].message.content;
  const vibesArr = vibes.split(/\W+/).filter(Boolean);
  */

  // create new Post with data fields
  const newPost = new Post({
    userid: req.user.id,
    imageUrl: req.body.post,
    caption: req.body.caption,
    vibes: vibesArr,
    date: req.body.created_at
  });

  try {
    const savedPost = await newPost.save(); // save post to database
    return res.status(200).json({ message: "Posted successfully", data: newPost }); 
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// deleting posts
router.delete('/', verifyToken, async (req, res) => { // verify token to determine current user
  try {
    if (req.type == "DEL") {
      const post = Post.deleteOne({ _id: new ObjectId(req.del_id) }) // remove specified post from database
        .then(result => {
          console.log("Delete successful", result.deletedCount);
          return res.status(200).json({ message: "Delete Sucessful" });
        })
        // give error if delete fails
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