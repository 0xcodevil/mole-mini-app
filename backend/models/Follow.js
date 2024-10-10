const mongoose = require('mongoose');

// Define the Follow schema
const FollowSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  username: { type: String, default: '' },
  joinedDate: { type: Date, default: Date.now },
  platform: { type: String, required: true, default: 'YouTube' },
});

module.exports = mongoose.model('Follow', FollowSchema);