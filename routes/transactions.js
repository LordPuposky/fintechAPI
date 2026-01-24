const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions');

router.get('/', transactionsController.getAll);
router.post('/', transactionsController.createTransaction);

module.exports = router;