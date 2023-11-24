const express = require('express');
const verifyToken = require('./verifyToken');
const User = require('../../models/UserSchema'); // Assuming you have a User model
const Post = require('../../models/PostSchema'); // Assuming you have a Post model
// const app = express();
const router = express.Router();


router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from the verified JWT
        const user = await User.findById(userId).select('-password'); // Exclude the password field
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.json(user); // Send the user profile data
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

module.exports = router;
