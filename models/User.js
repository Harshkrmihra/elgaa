const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [false, 'Please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [false, 'Please provide an email'],
    unique: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [false, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  type: {
    type: String,
    enum: ['Customer', 'Coach', 'Admin'],
    default: 'Customer',
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  affiliateCode: {
    type: String,
    unique: true
  },
  discordId: {
    type: String,
    unique: true
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);
reviews: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Review',
}],

module.exports = User;
