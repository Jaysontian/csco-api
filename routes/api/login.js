// handles user login/signup

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

    // Attempts to find request username within database
    const user = await User.findOne({username: req.body.username });    
    const login_type = req.body.logintype;    

    // Login Attempt
    if (login_type == "LOGIN") {

      // if user is in system
      if (user) {
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        // check if password is correct
        if (!isMatch) {
          res.status(401)
          res.statusMessage = "Password incorrect"
          return res.json({ message: "Password incorrect" });
        }
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // return user token with jwt
        return res.json({ token });
      }
      // if user is not in system, give error
      res.status(404)
      res.statusMessage = "Username doesn't exist"
      return res.json({ message: "Username doesn't exist, click Sign Up!" });
    } 

    // Signup attempt
    else {
      // check that user doesn't already exist
      if (!user) {
        const savedUser = await newUser.save();
        const payload = { id: savedUser.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // return new user token with kwt
        return res.json({ token });
      }
      // if user already exists, give error
      res.status(401)
      res.statusMessage = "Username already exists"
      return res.json({ message: "Username already exists"});
    }    

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
