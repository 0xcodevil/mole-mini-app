const mongoose = require('mongoose');

// Define the Follow schema
const BoostItemSchema = new mongoose.Schema(
    {
        boostid: { type: String, required: true, unique: true },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        logo: { type: String, default: '' },
        type: { type: String, enum: ['one-time', 'many-time', 'forever', 'period'], required: true, default: 'period' },
        period: { type: Number, default: 1 }, // Only applicable for 'period' type, in days
        maxUses: { type: Number, default: 1 }, // Only applicable for 'many-time' type
        bonus: { type: Number, default: 10 }, // get fish count if use boost
        price: { type: Number, default: 2 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('BoostItem', BoostItemSchema);