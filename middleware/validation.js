// Middleware for data validation

const validateAccountData = (req, res, next) => {
    const { accountNumber, accountType, currency, status, ownerId, openDate } = req.body;
    
    // Validar campos requeridos
    const missingFields = [];
    if (!accountNumber) missingFields.push('accountNumber');
    if (!accountType) missingFields.push('accountType');
    if (!currency) missingFields.push('currency');
    if (!status) missingFields.push('status');
    if (!ownerId) missingFields.push('ownerId');
    if (!openDate) missingFields.push('openDate');
    
    if (missingFields.length > 0) {
        return res.status(400).json({ 
            message: `Missing required fields: ${missingFields.join(', ')}` 
        });
    }
    
    // Validar tipos de datos
    if (req.body.balance !== undefined) {
        if (typeof req.body.balance !== 'number' || req.body.balance < 0) {
            return res.status(400).json({ 
                message: "Balance must be a positive number" 
            });
        }
    }
    
    if (req.body.interestRate !== undefined) {
        if (typeof req.body.interestRate !== 'number' || req.body.interestRate < 0) {
            return res.status(400).json({ 
                message: "Interest rate must be a positive number" 
            });
        }
    }
    
    // Validar valores permitidos
    const validAccountTypes = ['Savings', 'Checking', 'Credit', 'Investment'];
    if (!validAccountTypes.includes(accountType)) {
        return res.status(400).json({ 
            message: `Invalid account type. Must be one of: ${validAccountTypes.join(', ')}` 
        });
    }
    
    const validStatuses = ['Active', 'Inactive', 'Closed', 'Suspended'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
            message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
        });
    }
    
    next();
};

const validateTransactionData = (req, res, next) => {
    const { accountId, type, amount, date } = req.body;
    
    // Validar campos requeridos
    const missingFields = [];
    if (!accountId) missingFields.push('accountId');
    if (!type) missingFields.push('type');
    if (!amount) missingFields.push('amount');
    if (!date) missingFields.push('date');
    
    if (missingFields.length > 0) {
        return res.status(400).json({ 
            message: `Missing required fields: ${missingFields.join(', ')}` 
        });
    }
    
    // Validar tipos de datos
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ 
            message: "Amount must be a positive number" 
        });
    }
    
    // Validar valores permitidos
    const validTypes = ['Deposit', 'Withdrawal', 'Transfer', 'Payment'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({ 
            message: `Invalid transaction type. Must be one of: ${validTypes.join(', ')}` 
        });
    }
    
    next();
};

module.exports = {
    validateAccountData,
    validateTransactionData
};
