const Review = require('../models/review')
const Place = require('../models/place')

module.exports.createReview = async (req, res, next) => {
    const review = new Review(req.body.review);
    review.author = req.user._id;
    await review.save();
    const place = await Place.findById(req.params.id).populate('reviews');
    place.reviews.push(review)
    await place.save()
    req.flash('Sucess', 'Created new review')
    res.redirect(`/places/${req.params.id}`);
}
module.exports.deleteReview = async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    res.redirect(`/places/${req.params.id}`)
}