const Place = require('../models/place');

module.exports.index = async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', { places })
}

module.exports.createPlace = async (req, res) => {
    const place = new Place(req.body.place)
    place.author = req.user._id;
    await place.save()
    req.flash('success', 'Successfully added study spot!')
    res.redirect('/places')
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
    await Place.findByIdAndUpdate(id, { ...req.body.place }, { new: true });
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