const mongoose = require('mongoose');

// Define the ReferralLink schema
const ReferralLinkSchema = new mongoose.Schema(
    {
        linkid: { type: String, required: true, unique: true },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        completedMsg: { type: String, default: '' },
        logo: { type: String, default: '' },
        type: { type: String, required: true, default: 'social' },
        url: { type: String, default: 'https://test.com' },
        chatid: { type: Number, default: 0 },   //Only need in telegram channel or group
        bonus: { type: Number, default: 100 },
        order: { type: Number, default: 100 },
        visible: { type: Boolean, default: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('ReferralLink', ReferralLinkSchema);