const Place = require('../models/place');
const geocodeService = require('@mapbox/mapbox-sdk/services/geocoding');
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN
const geocodeClient = geocodeService({ accessToken: MAPBOX_TOKEN });

module.exports.index = async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', { places })
}

module.exports.createPlace = async (req, res) => {
    const place = new Place(req.body.place)
    place.author = req.user._id;
    place.images = req.files.map(f => ({ url: f.path, filename: f.filwename }))

    const geoData = await geocodeClient.forwardGeocode({
        query: place.address,
        limit: 1
    }).send()
    place.geometry = geoData.body.features[0].geometry;

    await place.save()
    console.log(place)
    req.flash('success', 'Successfully added study spot!')
    res.redirect(`/places/${place._id}`)
}

module.exports.renderNewForm = (req, res) => {
    res.render('places/new')
}

module.exports.showPlace = async (req, res) => {
    const place = await Place.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!place) {
        req.flash('error', 'Could not find study spot')
        return res.redirect('/places')
    }
    res.render('places/show', { place })
}
module.exports.updatePlace = async (req, res) => {
    const { id } = req.params;
    const place = await Place.findByIdAndUpdate(id, { ...req.body.place }, { new: true });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    place.images.push(...imgs)
    const geoData = await geocodeClient.forwardGeocode({
        query: place.address,
        limit: 1
    }).send()
    place.geometry = geoData.body.features[0].geometry;
    await place.save();
    req.flash('success', 'Successfully updated study spot!')
    res.redirect(`/places/${id}`);
}
module.exports.deletePlace = async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted study spot!')
    res.redirect('/places')
}
module.exports.renderEditForm = async (req, res) => {
    const place = await Place.findById(req.params.id);
    if (!place) {
        req.flash('error', 'Could not find study spot')
        return res.redirect('/places')
    }
    res.render('places/edit', { place })
}