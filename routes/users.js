const express = require('express')
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register')
})
router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body.user
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.flash('success', 'Welcome to StudySpot!')
        res.redirect('/places')
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/users/register')
    }
}))
module.exports = router;