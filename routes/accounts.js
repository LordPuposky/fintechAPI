const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accounts');

// Route to get all accounts
router.get('/', accountsController.getAll);
// Route to create a new account
router.post('/', accountsController.createAccount);
// Route for updating an account using its ID
router.put('/:id', accountsController.updateAccount);
// Route for deleting an account using its ID
router.delete('/:id', accountsController.deleteAccount);

module.exports = router;