// models/LoginSchema.js
const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
});

const LoginInfo = mongoose.model('LoginInfo', LoginSchema);

module.exports = LoginInfo;