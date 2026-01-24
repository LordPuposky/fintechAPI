const Transaction = require('../models/transaction');

// Get all transactions
const getAll = async (req, res) => {
    // #swagger.tags = ['Transactions']
    try {
        const transactions = await Transaction.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single transaction by ID - AQUÍ ESTABA EL ERROR DE NOMBRE
const getTransactionById = async (req, res) => {
    // #swagger.tags = ['Transactions']
    try {
        const transactionId = req.params.id;
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            res.status(404).json({ message: 'Transaction not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(transaction);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new transaction
const createTransaction = async (req, res) => {
    /* #swagger.tags = ['Transactions']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Transaction details',
            schema: {
                accountId: '697406a74e7fbd583b36ad60',
                type: 'Deposit',
                amount: 500,
                date: '2026-01-24',
                description: 'Monthly savings'
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

// Update a transaction
const updateTransaction = async (req, res) => {
    /* #swagger.tags = ['Transactions']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Transaction details to update',
            schema: {
                type: 'Withdrawal',
                amount: 200,
                description: 'Updated description'
            }
        }
    */
    try {
        const transactionId = req.params.id;
        const response = await Transaction.findByIdAndUpdate(transactionId, req.body, {
            new: true,
            runValidators: true
        });
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
    // #swagger.tags = ['Transactions']
    try {
        const transactionId = req.params.id;
        const response = await Transaction.findByIdAndDelete(transactionId);
        if (!response) {
            res.status(404).json({ message: 'Transaction not found' });
        } else {
            res.status(200).json({ message: `Transaction ${transactionId} deleted` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
};