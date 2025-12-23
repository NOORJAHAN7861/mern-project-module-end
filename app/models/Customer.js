const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contact_info: {
      email: { type: String, trim: true, lowercase: true },
      phone: { type: String, trim: true },
      address: { type: String, trim: true }
    },
    status: { type: String, enum: ['active', 'inactive', 'prospect'], default: 'active' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);