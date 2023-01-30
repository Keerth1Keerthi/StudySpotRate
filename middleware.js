const { placeSchema, reviewSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');


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
        req.flash('error', 'You must be signed in to do that.')
        return res.redirect('/login')
    }
    next();
}
module.exports.validatePlace = validatePlace
module.exports.validateReview = validateReview
module.exports.isLoggedIn = isLoggedIn