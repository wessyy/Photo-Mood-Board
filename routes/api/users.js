const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');
const Board = require('../../models/board');

// @route   POST api/Users
// @desc    Register new users
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email }).then(user => {
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const newUser = new User({
            name,
            email,
            password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                });
            })
        })
    })
});

// @route   GET api/Users/getAllUsers
// @desc    Get all users
// @access  Restricted
router.get('/getAllUsers', (req, res) => {
    User.find({})
        .then(users => res.json({users}))
        .catch(err => res.status(404).json({msg: 'Sum ting wong'}));
});


// @route   DELETE api/Users/delete/:id
// @desc    Delete user account
// @access  Public
router.delete('/delete/:id', (req, res) => {
    const { email, password } = req.body;
    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ _id: req.params.id, email }).then(user => {
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        // Validate password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            user.remove()
                .then(() => res.json({success: true}))
                .catch(err => res.status(404).json({success: false}));
        });
    });
});

module.exports = router;

