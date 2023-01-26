const express = require('express')
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review');
const Place = require('../models/place')
const { validateReview } = require('../middleware')

router.post('/', validateReview, catchAsync(async (req, res, next) => {
    const review = new Review(req.body.review);
    await review.save();
    const place = await Place.findById(req.params.id).populate('reviews');
    place.reviews.push(review)
    await place.save()
    res.redirect(`/places/${req.params.id}`);
}))
router.delete('/:reviewId', catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    res.redirect(`/places/${req.params.id}`)
}))

module.exports = router;