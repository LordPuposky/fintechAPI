const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Fintech API - FutureBank Insights',
        description: 'API for managing bank accounts and digital banking trends',
    },
    // Leaving host empty or using a variable allows it to adapt to Render or Localhost
    host: 'project02-cse341-byu.onrender.com', // Replace with your actual Render URL later
    schemes: ['https', 'http'], // Render uses https by default
    definitions: {
        // Adding definitions helps Swagger know the structure of your data
        account: {
            accountNumber: "SB-1783-LIB",
            accountType: "Savings",
            balance: 50000,
            currency: "USD",
            interestRate: 0.05,
            status: "Active",
            ownerId: "Simón Bolívar",
            openDate: "2026-01-23"
        },
        transaction: {
            accountId: "6973f127...",
            type: "Deposit",
            amount: 5000,
            date: "2026-01-23",
            description: "Logistics funding",
            status: "Completed"
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Generate the documentation
swaggerAutogen(outputFile, endpointsFiles, doc);