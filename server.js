const express = require('express');
const mongodb = require('./db/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const passport = require('passport'); // Authentication middleware
const session = require('express-session'); // To handle session cookies
const GitHubStrategy = require('passport-github2').Strategy; // OAuth strategy for GitHub
const cors = require('cors'); // To handle Cross-Origin Resource Sharing

const app = express();
const port = process.env.PORT || 8080;

// 1. MIDDLEWARE CONFIGURATION
app.use(express.json()); // Parse JSON request bodies

// CORS Configuration using the 'cors' library for better compatibility
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    origin: true,
    credentials: true
}));

// Express Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

// Initialize Passport and link it to the session
app.use(passport.initialize());
app.use(passport.session());

// 2. PASSPORT STRATEGY CONFIGURATION
// Setting up the GitHub OAuth strategy with credentials from .env
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        // In a real app, you would find or create a user in MongoDB here
        return done(null, profile);
    }
));

// Session Serialization: determine which data of the user object should be stored in the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Session Deserialization: retrieve the user object based on the ID stored in the session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// 3. AUTHENTICATION & DOCUMENTATION ROUTES

// Documentation route (Swagger)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Callback route where GitHub redirects the user after login
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs'
}), (req, res) => {
    // Successfully logged in, save user info to the session
    req.session.user = req.user;
    res.redirect('/');
});

// Main routes linked from routes/index.js
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