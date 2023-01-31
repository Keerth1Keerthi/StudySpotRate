const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = require('./user')


const ReviewSchema = new Schema({
    rating: Number,
    text: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;