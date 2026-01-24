const express = require('express');
const mongodb = require('./db/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const port = process.env.PORT || 8080;

// 1. MIDDLEWARE CONFIGURATION
app.use(express.json()); // To parse JSON bodies

// CORS Configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// 2. DOCUMENTATION ROUTE (Swagger)
// It's better to place this before the main routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 3. MAIN APPLICATION ROUTES
app.use('/', require('./routes'));

// 4. DATABASE INITIALIZATION AND SERVER START
mongodb.initDb((err) => {
    if (err) {
        console.log('Database connection error:', err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to DB and listening on ${port}`);
            console.log(`Check documentation at: http://localhost:${port}/api-docs`);
        });
    }
});