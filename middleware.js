const { placeSchema, reviewSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Place = require('./models/place')


const validatePlace = (req, res, next) => {
    const { error } = placeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next()
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in to do that.')
        return res.redirect('/login')
    }
    next();
}

const isAuthor = async (req, res, next) => {
    const id = req.params.id;
    const place = await Place.findById(id);
    console.log(place)
    if (!place.author.equals(req.user._id)) {
        req.flash('error', 'You do have permission to do that!')
        return res.redirect(`/places/${id}`)
    }
    next()
}
module.exports.validatePlace = validatePlace
module.exports.validateReview = validateReview
module.exports.isLoggedIn = isLoggedIn
module.exports.isAuthor = isAuthor