const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const logger = require('../helper/logger');


const UserSchema = new mongoose.Schema({
  userid: { type: String, unique: true, required: [true, 'Please provide telegram id'] },
  username: { type: String, default: '' },
  firstname: { type: String, default: '' },
  lastname: { type: String, default: '' },
  inviter: { type: String, default: '' },
  isPremium: { type: Boolean, default: false },

  referrals: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'ReferralLink' },
    finished: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now },
  }],
  
  inviteFive: { type: Boolean, default: false },
  
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  
  token: { type: Number, default: 0 },
  point: { type: Number, default: 0 },
  ticket: { type: Number, default: 5 },

  totalScore: { type: Number, default: 0 },
  weeklyScore: { type: Number, default: 0 },
  monthlyScore: { type: Number, default: 0 },

  lastRewardDate: { type: Date },
  rewardStreak: { type: Number, default: 0 },

  boosts: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'BoostItem' },
    endTime: { type: Date, default: Date.now },
    usesRemaining: { type: Number, default: 1 },
  }],
});

// Method to add point with totalScore, weeklyScore, monthlyScore
UserSchema.methods.addPoint = async function(value) {
  this.point += value;
  this.totalScore += value;
  this.weeklyScore += value;
  this.monthlyScore += value;

  return this;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
