const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', transactionsController.getAll);
router.get('/:id', transactionsController.getTransactionById);

// Protect all state-changing operations
router.post('/', isAuthenticated, transactionsController.createTransaction);
router.put('/:id', isAuthenticated, transactionsController.updateTransaction);
router.delete('/:id', isAuthenticated, transactionsController.deleteTransaction);

module.exports = router;