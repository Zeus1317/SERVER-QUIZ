const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/create', async (req, res) => {
    try {
        const { username } = req.body;
        const user = new User({ username });
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Get user info
router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});

module.exports = router;
