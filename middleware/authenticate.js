// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    // Check if the user object exists in the session
    if (req.session.user === undefined) {
        // If not logged in, return an Unauthorized error
        return res.status(401).json("You do not have access. Please log in first.");
    }
    // If logged in, proceed to the next function
    next();
};

module.exports = {
    isAuthenticated
};