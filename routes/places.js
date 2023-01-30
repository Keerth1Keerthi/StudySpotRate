const express = require('express')
const router = express.Router();

const catchAsync = require('../utils/catchAsync');

const Place = require('../models/place');
const { validatePlace, isLoggedIn, isAuthor } = require('../middleware')

const places = require('../controllers/places')

router.route('/')
    .get(catchAsync(places.index))
    .post(isLoggedIn, validatePlace, catchAsync(places.createPlace))

router.route('/new')
    .get(isLoggedIn, places.renderNewForm)

router.route('/:id')
    .get(catchAsync(places.showPlace))
    .put(isLoggedIn, isAuthor, validatePlace, catchAsync(places.updatePlace))
    .delete(isLoggedIn, isAuthor, catchAsync(places.deletePlace))

router.route('/:id/edit')
    .get(isLoggedIn, isAuthor, catchAsync(places.renderEditForm))

module.exports = router