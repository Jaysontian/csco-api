// routes/api/photos.js
const express = require('express');
const Photo = require('../../models/PhotoSchema'); // Import the model
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const newPhoto = new Photo({
    title: req.body.title,
    url: req.body.url
  });

  try {
    const savedPhoto = await newPhoto.save();
    res.status(201).json(savedPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
