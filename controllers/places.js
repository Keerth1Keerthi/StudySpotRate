const Place = require('../models/place');

module.exports.index = async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', { places })
}

module.exports.createPlace = async (req, res) => {
    const place = new Place(req.body.place)
    await place.save()
    res.redirect('/places')
}

module.exports.renderNewForm = (req, res) => {
    res.render('places/new')
}

module.exports.showPlace = async (req, res) => {
    const place = await Place.findById(req.params.id).populate('reviews');
    res.render('places/show', { place })
}
module.exports.updatePlace = async (req, res) => {
    const { id } = req.params;
    await Place.findByIdAndUpdate(id, { ...req.body.place }, { new: true });
    res.redirect(`/places/${id}`);
}
module.exports.deletePlace = async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    res.redirect('/places')
}
module.exports.renderEditForm = async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/edit', { place })
}