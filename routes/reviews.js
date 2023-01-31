const express = require('express')
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review');
const Place = require('../models/place');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))
router.delete('/:reviewId', isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;