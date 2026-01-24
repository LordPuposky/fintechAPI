const mongoose = require('mongoose');

/**
 * Account Schema - FutureBank Insights
 * Meets the requirement of 7+ fields (8 fields total)
 */
const accountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: [true, 'Account number is mandatory'],
        unique: true
    },
    accountType: {
        type: String,
        required: [true, 'Account type is required'],
        enum: ['Savings', 'Checking', 'Business', 'Investment']
    },
    balance: {
        type: Number,
        required: [true, 'Initial balance is required'],
        min: [0, 'Balance cannot be negative'] 
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'COP', 'EUR'],
        default: 'USD'
    },
    interestRate: {
        type: Number,
        required: true,
        min: [0, 'Interest rate cannot be negative'],
        max: [1, 'Interest rate cannot exceed 100% (1.0)']
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Frozen', 'Closed'],
        default: 'Active'
    },
    ownerId: {
        type: String,
        required: [true, 'An owner ID is required']
    },
    openDate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('account', accountSchema);