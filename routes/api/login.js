// routes/api/login.js
const express = require('express');
const LoginInfo = require('../../models/LoginSchema');
const Photo = require('../../models/LoginSchema'); // Import the model
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const logins = await LoginInfo.find();
    res.json(logins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const newLogin = new LoginInfo({
    username: req.body.username,
    password: req.body.password
  });

  try {
    const savedLogin = await newLogin.save();
    res.status(201).json(savedLogin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
