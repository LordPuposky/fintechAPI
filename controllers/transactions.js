const Transaction = require('../models/transaction');

// Get all transactions
const getAll = async (req, res) => {
    try {
        // #swagger.tags = ['Transactions']
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a transaction
const createTransaction = async (req, res) => {
    /* #swagger.tags = ['Transactions']
        #swagger.description = 'Endpoint to create a new financial transaction'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Transaction details',
            required: true,
            schema: {
                accountId: '6973f127...',
                type: 'Deposit',
                amount: 5000,
                date: '2026-01-23',
                description: 'Payment for services',
                status: 'Completed'
            }
        }
    */
    try {
        const transaction = new Transaction(req.body);
        const response = await transaction.save();
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, createTransaction };