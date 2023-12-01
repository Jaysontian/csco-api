const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const Post = require('../../models/PostSchema');
const multer = require('multer');

const storage = multer.diskStorage({ // config how temp files are stored
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({storage: storage, limits: {fileSize: 1024*1024*20}});


//imgur.setClientId("65ee8505a324c37");

router.post('/', upload.single('image'), verifyToken, async (req, res, next) => { 
    console.log(req.file);
    const newImage = new Post({
        userid: req.user.id,
        imageUrl: req.file.path,
        caption: req.file.originalname,
        date: Date.now(),
    });

    try {
        const savedPost = await newImage.save();
        return res.status(200).json({ message: "Posted successfully", data: savedPost }); 
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

});

module.exports = router;