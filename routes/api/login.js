// routes/api/login.js

require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/UserSchema');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });  

    // perform check for whether user exists or not
    const user = await User.findOne({username: req.body.username });    
    const login_type = req.body.login_type;    

    // Login Attempt
    if (login_type == "LOGIN") {
      if (user) {
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          res.status(401)
          res.statusMessage = "Password incorrect"
          return res.json({ message: "Password incorrect" });
        }
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });

        // return res.status(200).json({ message: "User logged in successfully", data: newUser});
      }
      res.status(404)
      res.statusMessage = "Username doesn't exist"
      return res.json({ message: "Username doesn't exist" });
    } 
    // Signup attempt
    else {
      if (!user) {
        const savedUser = await newUser.save();
        const payload = { id: savedUser.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
        // return res.status(200).json({ message: "User signed up successfully", data: newUser });
      }
      res.status(405)
      res.statusMessage = "Username already exists"
      return res.json({ message: "Username already exists"});
    }    

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
