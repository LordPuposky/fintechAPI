const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
    // #swagger.tags = ['General']
    res.send('Project 02 - Fintech API is Running');
});

// Link the accounts routes
router.use('/accounts', require('./accounts'));

// Link the transactions routes
router.use('/transactions', require('./transactions'));

module.exports = router;