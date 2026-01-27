const express = require('express');
const router = express.Router();
const passport = require('passport');

// Root route: Shows a welcome message or login status
router.get('/', (req, res) => {
    // #swagger.tags = ['General']
    // Check if the user is logged in via the session object
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out");
});

// Login route: Triggers the GitHub authentication process
router.get('/login', passport.authenticate('github', (req, res) => {
    // This function is handled by Passport
}));

// Logout route: Terminate the session and redirect back to root
router.get('/logout', function (req, res, next) {
    // Passport's logout method
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// Link the accounts routes
router.use('/accounts', require('./accounts'));

// Link the transactions routes
router.use('/transactions', require('./transactions'));

module.exports = router;