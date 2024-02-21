// schema for user

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // library used to hash and store passwords

// defines User model and required fields
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  created_at: { // date account created
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function(next) {
  let user = this;

  // Only hash the password if it has been modified (or is new).
  if (!user.isModified('password')) return next();

  // Generate a salt and hash the password.
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // Replace the plain text password with the hashed one.
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', UserSchema); // export schema as model for Mongo

module.exports = User;