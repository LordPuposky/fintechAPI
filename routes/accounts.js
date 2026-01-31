const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accounts');
// Import the authentication middleware
const { isAuthenticated } = require("../middleware/authenticate");
// Import the validation middleware
const { validateAccountData } = require("../middleware/validation");

// Public route (anyone can view accounts)
router.get('/', accountsController.getAll);
router.get('/:id', accountsController.getTransactionById);

// Protected routes (requires login)
// IMPORTANTE: La validación va PRIMERO, luego la autenticación
router.post('/', validateAccountData, isAuthenticated, accountsController.createAccount);
router.put('/:id', validateAccountData, isAuthenticated, accountsController.updateAccount);
router.delete('/:id', isAuthenticated, accountsController.deleteAccount);

module.exports = router;
