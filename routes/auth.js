const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.redirect('/register?error=Email already exists');

    user = new User({ name, email, password });
    await user.save();
    res.redirect('/login');
});

// Login User
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login?error=Invalid credentials',
    failureFlash: true
}));

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;