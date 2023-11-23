// routes/api/login.js
const express = require('express');
const LoginInfo = require('../../models/LoginSchema');
const Photo = require('../../models/LoginSchema'); // Import the model
const router = express.Router();

router.post('/', async (req, res) => {
  const newLogin = new LoginInfo({
    username: req.body.username,
    password: req.body.password
  });

  try {
    // perform check for whether user exists or not
    const user = await LoginInfo.findOne({username: req.body.username });    
    const login_type = req.body.login_type;    

    // Login Attempt
    if (login_type == "LOGIN") {
      if (user) {
        if (user.password == req.body.password){
          return res.status(200).json({ message: "User logged in successfully", data: newLogin});
        }
        res.status(400)
        res.statusMessage = "Password incorrect"
        return res.json({ message: "Password incorrect" });
      }
      res.status(400)
      res.statusMessage = "Username doesn't exist"
      return res.json({ message: "Username doesn't exist" });
    } 
    // Signup attempt
    else {
      if (!user) {
        const savedLogin = await newLogin.save();
        return res.status(200).json({ message: "User signed up successfully", data: newLogin });
      }
      res.status(400)
      res.statusMessage = "Username already exists"
      return res.json({ message: "Username already exists"});
    }    

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
