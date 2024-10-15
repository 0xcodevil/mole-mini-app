const mongoose = require('mongoose');

// Define the Follow schema
const FollowSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  referralid: { type: String, required: true},
  payload: { type: String, default: '' },
  joinedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Follow', FollowSchema);