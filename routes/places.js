const express = require('express')
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const Place = require('../models/place');

const { placeSchema } = require('../schemas');


const validatePlace = (req, res, next) => {
    const { error } = placeSchema.validate(req.body);
    if (error) {
        console.log('ERROR VALIDATE PLACE')
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next()
    }
}
router.get('/', catchAsync(async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', { places })
}))
router.post('/', validatePlace, catchAsync(async (req, res) => {
    const place = new Place(req.body.place)
    await place.save()
    res.redirect('places')
}))
router.get('/new', (req, res) => {
    res.render('places/new')
})

router.get('/:id', catchAsync(async (req, res) => {
    console.log('ERROR PRE FINDBYID')
    const place = await Place.findById(req.params.id).populate('reviews');
    console.log('ERROR POST FINDBYID')
    console.log('PLACEEE ', place)
    res.render('places/show', { place })
}))

router.put('/:id', validatePlace, catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log('PLACEEe', req.body.place)
    const place = await Place.findByIdAndUpdate(id, { ...req.body.place }, { new: true });
    console.log('PUTTINGGGG', place);
    res.redirect(`/places/${id}`);
}))
router.delete('/:id', catchAsync(async (req, res) => {
    const place = await Place.findByIdAndDelete(req.params.id);
    res.redirect('/places')
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/edit', { place })
}))
module.exports = router