const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  }
}, {
  timestamps: true, 
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  
  return userObject;
};

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.username) {
    user.username = user.email;
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;