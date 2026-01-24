const Account = require('../models/account');

// Get all accounts from the database
const getAll = async (req, res) => {
    try {
        // #swagger.tags = ['Accounts']
        const accounts = await Account.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new account
const createAccount = async (req, res) => {
    /* #swagger.tags = ['Accounts']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'New account details',
            required: true,
            schema: {
                accountNumber: '123456789',
                accountType: 'Savings',
                balance: 1000,
                currency: 'USD',
                interestRate: 0.02,
                status: 'Active',
                ownerId: '65a... (User ID)',
                openDate: '2026-01-24'
            }
        }
    */
    try {
        const account = new Account({
            accountNumber: req.body.accountNumber,
            accountType: req.body.accountType,
            balance: req.body.balance,
            currency: req.body.currency,
            interestRate: req.body.interestRate,
            status: req.body.status,
            ownerId: req.body.ownerId,
            openDate: req.body.openDate
        });

        const response = await account.save();
        res.status(201).json(response);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: err.message || 'Some error occurred while creating the account.' });
    }
};

// Update an account
const updateAccount = async (req, res) => {
    /* #swagger.tags = ['Accounts']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated account details',
            required: true,
            schema: {
                accountNumber: '123456789',
                accountType: 'Savings',
                balance: 1500,
                currency: 'USD',
                interestRate: 0.02,
                status: 'Active',
                ownerId: '65a...',
                openDate: '2026-01-24'
            }
        }
    */
    try {
        const accountId = req.params.id;
        const account = {
            accountNumber: req.body.accountNumber,
            accountType: req.body.accountType,
            balance: req.body.balance,
            currency: req.body.currency,
            interestRate: req.body.interestRate,
            status: req.body.status,
            ownerId: req.body.ownerId,
            openDate: req.body.openDate
        };

        // runValidators: true asegura que se valide el ENUM y tipos al actualizar
        const response = await Account.findByIdAndUpdate(accountId, account, {
            new: true,
            runValidators: true
        });

        if (!response) {
            res.status(404).json({ message: 'Account not found' });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: err.message || 'Some error occurred while updating the account.' });
    }
};

// Delete an account
const deleteAccount = async (req, res) => {
    try {
        // #swagger.tags = ['Accounts']
        const accountId = req.params.id;
        const response = await Account.findByIdAndDelete(accountId);

        if (!response) {
            res.status(404).json({ message: 'Account not found' });
        } else {
            res.status(200).json({ message: `Account ${accountId} deleted successfully` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the account.' });
    }
};

module.exports = {
    getAll,
    createAccount,
    updateAccount,
    deleteAccount
};