const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to check authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Home Page
router.get('/', (req, res) => {
    res.render('home');
});

// Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Dashboard (Protected Route)
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});

module.exports = router;
