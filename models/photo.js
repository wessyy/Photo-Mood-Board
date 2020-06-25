const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PhotoSchema = new Schema({
    img: { data: Buffer, contentType: String }
    
});

module.exports = Photo = mongoose.model('photo', PhotoSchema);