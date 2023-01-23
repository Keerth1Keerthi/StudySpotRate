const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    title: String,
    averageRating: Number,
    location: String,
    tags: [String],
    description: String,
    image: String
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;