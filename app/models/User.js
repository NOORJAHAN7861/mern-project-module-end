const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'agent', 'viewer'], default: 'agent' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);