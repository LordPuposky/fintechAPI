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
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
};

// Get a transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a transaction
const updateTransaction = async (req, res) => {
    /* #swagger.tags = ['Transactions']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Transaction details to update',
            schema: {
                accountId: '69740833...',
                type: 'Deposit',
                amount: 5000,
                date: '2026-01-23',
                description: 'Updated description',
                status: 'Completed'
            }
        }
    */
    try {
        const transactionId = req.params.id;
        const response = await Transaction.findByIdAndUpdate(transactionId, req.body, { new: true, runValidators: true });

        if (!response) {
            res.status(404).json({ message: 'Transaction not found' });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
    /* #swagger.tags = ['Transactions'] */
    try {
        const transactionId = req.params.id;
        const response = await Transaction.findByIdAndDelete(transactionId);

        if (!response) {
            res.status(404).json({ message: 'Transaction not found' });
        } else {
            res.status(200).json({ message: `Transaction ${transactionId} deleted successfully` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};





module.exports = {
    getAll, getTransactionById, createTransaction, updateTransaction,
    deleteTransaction
};