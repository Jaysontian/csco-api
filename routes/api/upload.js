// handles image uploads for images uploaded as files

const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const Post = require('../../models/PostSchema');
const OpenAI = require("openai");
const multer = require('multer');

const openai = new OpenAI({apiKey: process.env.API_KEY}) // open ai instance

// store uploaded images in /uploads folder
const storage = multer.diskStorage({ // config how temp files are stored
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({storage: storage, limits: {fileSize: 1024*1024*20}});

// posting for images uploaded as files
router.post('/', upload.single('image'), verifyToken, async (req, res, next) => { 
    const caption = req.body.caption;
    let vibesArr = [];

    // request to gpt to generate vibe adjectives from image caption
        // Note: GPT 4 Vision Preview API currently doesn't accept files (only URLs)
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
    // generate new Post with data fields
    const newImage = new Post({
        userid: req.user.id,
        imageUrl: req.file.path,
        vibes: vibesArr,
        caption: req.body.caption,
        date: Date.now(),
    });

    try {
        // save post to database
        const savedPost = await newImage.save();
        return res.status(200).json({ message: "Posted successfully", data: savedPost }); 
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

});

module.exports = router;