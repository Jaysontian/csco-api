const express = require('express'); // Import express framework
const router = express.Router(); //
const Post = require('../models/PostSchema');

router.delete('/:postId', async(req,res) => {
    const postId = req.params.postId;

    try{
        await Post.findByIdAndDelete(postId); // try to delete the postID
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error'});
    }
});

module.exports = router;
