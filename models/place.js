const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Review = require('./review')
const PlaceSchema = new Schema({
    title: String,
    averageRating: Number,
    location: String,
    tags: [String],
    description: String,
    image: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const Place = mongoose.model('Place', PlaceSchema);

PlaceSchema.post('findOneAndDelete', async (place) => {
    if (place) {
        await Review.deleteMany({
            _id: {
                $in: place.reviews
            }
        })
    }
})

module.exports = Place;