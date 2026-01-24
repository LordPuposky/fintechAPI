const mongoose = require('mongoose');

/**
 * Transaction Schema - FutureBank Insights
 * Defines the structure for financial movements within the fintech platform.
 */
const transactionSchema = new mongoose.Schema({
    // Reference to the account ID this transaction belongs to
    accountId: {
        type: String,
        required: [true, 'Account ID is mandatory to link the transaction']
    },
    // Type of financial movement
    type: {
        type: String,
        required: [true, 'Transaction type is required'],
        enum: ['Deposit', 'Withdrawal', 'Transfer'] // Validates allowed movement types
    },
    // Monetary value of the transaction
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0.01, 'Amount must be greater than zero'] // Financial business rule
    },
    // Date of the movement
    date: {
        type: String,
        required: true
    },
    // Short detail about the transaction
    description: {
        type: String,
        required: [true, 'A description is needed for auditing']
    },
    // Current state of the process
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Completed', 'Failed'], // Validates standard banking statuses
        default: 'Pending'
    }
});

module.exports = mongoose.model('transaction', transactionSchema);