const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mynewDB');
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // optional: exit process if connection fails
  }
};

module.exports = { connectDB };
