// handles user search

require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/UserSchema');
const router = express.Router();

// searching for other users
router.post('/', async (req, res) => {
    try {  
        // perform check for whether user exists or not
        const user = await User.findOne({username: req.body.username });    

        // if searched-for user doesn't exist, give error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
        // otherwise, return searched-for user token
        else {
            const payload = { id: user.id };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
