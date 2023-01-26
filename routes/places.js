const express = require('express')
const router = express.Router();

const catchAsync = require('../utils/catchAsync');

const Place = require('../models/place');
const { validatePlace } = require('../middleware')

const places = require('../controllers/places')

router.route('/')
    .get(catchAsync(places.index))
    .post(validatePlace, catchAsync(places.createPlace))

router.route('/new')
    .get(places.renderNewForm)

router.route('/:id')
    .get(catchAsync(places.showPlace))
    .put(validatePlace, catchAsync(places.updatePlace))
    .delete(catchAsync(places.deletePlace))

router.route('/:id/edit')
    .get(catchAsync(places.renderEditForm))

module.exports = router