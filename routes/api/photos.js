const express = require('express');
const fs = require('fs');
const router = express.Router();
// const auth = require('../../middleware/auth');

// Board Model
const Board = require('../../models/board');

// @route   GET api/photos/getPhotos/:boardId
// @desc    Get All Photos For a Board
// @access  Public
router.get('/getPhotos/:boardID', (req, res) => {
    Board.findById(req.params.boardID).then(doc => {
        res.contentType(doc.img.contentType);
        res.send(doc.img);
    }).catch(err => {
        res.status(404).json({msg: 'Sum ting wong'})
    });
});

// @route   POST api/photos/uploadPhoto/:boardID
// @desc    Create A Photo
// @access  Public
router.post('/uploadPhoto/:boardID', (req, res) => {
    const boardID = req.params.boardID;
    const userId = req.body.userID;
    console.log(req.body);

    User.findOne({ _id: userId, "boards.boardID": boardID }).then(user => {
        if (!user) return res.status(400).json({ msg: 'User does not have board with boardID' });

        Board.findByIdAndUpdate(
            boardID,
            {$push: {
                "photos": {
                    data: req.body.photo.data,
                    contentType: req.body.photo.contentType
                }
            }},
            {new: true},
            function(err, doc) {
                if (err) {
                    console.log(err);
                }
                res.json({
                    data: req.body.photo.data,
                    contentType: req.body.photo.contentType
                });
            }
        );
    }).catch(err => res.status(404).json({msg: 'Error uploading photo to board'}));
});

module.exports = router;
