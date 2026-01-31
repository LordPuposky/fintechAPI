const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions');
const { isAuthenticated } = require("../middleware/authenticate");
// Import the validation middleware
const { validateTransactionData } = require("../middleware/validation");

router.get('/', transactionsController.getAll);
router.get('/:id', transactionsController.getTransactionById);

// Protect all state-changing operations
// IMPORTANTE: La validación va PRIMERO, luego la autenticación
router.post('/', validateTransactionData, isAuthenticated, transactionsController.createTransaction);
router.put('/:id', validateTransactionData, isAuthenticated, transactionsController.updateTransaction);
router.delete('/:id', isAuthenticated, transactionsController.deleteTransaction);

module.exports = router;
