const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');
const Board = require('../../models/board');

// @route   GET api/boards/getAllBoards
// @desc    Get all boards
// @access  Public
router.get('/getAllBoards', (req, res) => {
    Board.find({}, ['_id', 'name', 'photos.date'])
        .then(boards => res.json({boards}))
        .catch(err => res.status(404).json({msg: 'Sum ting wong'}));
});

// @route   GET api/boards/getPicturesFromBoard/:boardID
// @desc    Get all pictures
// @access  Public
router.get('/getPicturesFromBoard/:boardID', (req, res) => {
    Board.findById(req.params.boardID, ['photos'])
        .then(boards => res.json({boards}))
        .catch(err => res.status(404).json({msg: 'Sum ting wong'}));
});

// @route   POST api/boards/:boardID
// @desc    Add a Photo
// @access  Public
router.post('/:boardID', (req, res) => {
    const boardID = req.params.boardID;
    const userId = req.body.userId;

    User.findOne({ _id: userId, "boards.boardID": boardID }).then(user => {
        if (!user) return res.status(400).json({ msg: 'User does not have board with boardID' });

        Board.findByIdAndUpdate(
            boardID,
            {$push: {
                "photos": {
                    data: fs.readFileSync(req.body.photo),
                    // data: fs.readFileSync(req.body.path),
                    contentType: 'image/jpg'
                }
            }},
            {new: true},
            function(err, board) {
                if (err) {
                    console.log(err);
                }
                res.json({success: true});
            }
        );
    });
});

// @route   POST api/boards/createBoard
// @desc    Register new users
// @access  Public
router.post('/createBoard', (req, res) => {
    const boardName = req.body.name;
    const userId = req.body.user.id;

    // Simple validation
    if (!boardName) {
        return res.status(400).json({ msg: 'Please enter board name' });
    }

    User.findOne({ _id: userId, "boards.name": boardName }).then(user => {
        if (user) return res.status(400).json({ msg: 'Board name already exists' });

        // Add new board to BoardSchema
        const newBoard = new Board({
            name: boardName
        });
        newBoard.save().then(board => {
            // Add the board to User's boards
            User.findByIdAndUpdate(
                userId, 
                {$push: {"boards": {boardID: board.id, name: boardName}}},
                {new: true},
                function(err, user) {
                    if (err) {
                        console.log(err);
                    }
                    res.json({success: true});
                }
            );
        }).catch(err => res.status(404).json({msg: 'Sum ting wong'}));
    });
});

module.exports = router;
