import { Schema, model } from 'mongoose'; // Використовуйте import замість require

const userSchema = new Schema({
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

// Експортуємо як default, щоб import { User } from ... працював правильно
export const User = model('User', userSchema);