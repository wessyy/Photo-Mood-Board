const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BoardSchema = new Schema({
    name: String,
    photos:[{
        data: Buffer,
        contentType: String,
        title: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
});


module.exports = Board = mongoose.model('board', BoardSchema);
