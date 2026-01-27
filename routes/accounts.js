const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accounts');
// Import the authentication middleware
const { isAuthenticated } = require("../middleware/authenticate");

// Public route (anyone can view accounts)
router.get('/', accountsController.getAll);
router.get('/:id', accountsController.getSingle);

// Protected routes (requires login)
router.post('/', isAuthenticated, accountsController.createAccount);
router.put('/:id', isAuthenticated, accountsController.updateAccount);
router.delete('/:id', isAuthenticated, accountsController.deleteAccount);

module.exports = router;