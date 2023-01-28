const express = require('express')
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review');
const Place = require('../models/place');
const { validateReview } = require('../middleware');
const reviews = require('../controllers/reviews');

router.post('/', validateReview, catchAsync(reviews.createReview))
router.delete('/:reviewId', catchAsync(reviews.deleteReview))

module.exports = router;