const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { validatePlace, isLoggedIn, isAuthor } = require('../middleware')
const places = require('../controllers/places')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(places.index))
    .post(isLoggedIn, upload.array('place[image]'), validatePlace, catchAsync(places.createPlace))

router.route('/new')
    .get(isLoggedIn, places.renderNewForm)

router.route('/:id')
    .get(catchAsync(places.showPlace))
    .put(isLoggedIn, isAuthor, upload.array('place[image]'), validatePlace, catchAsync(places.updatePlace))
    .delete(isLoggedIn, isAuthor, catchAsync(places.deletePlace))

router.route('/:id/edit')
    .get(isLoggedIn, isAuthor, catchAsync(places.renderEditForm))

module.exports = router