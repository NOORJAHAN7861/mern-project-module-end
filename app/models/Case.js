const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema(
  {
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    status: { type: String, enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' },
    created_at: { type: Date, default: Date.now },
    title: { type: String, trim: true },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Case', caseSchema);