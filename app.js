const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
//Error Handling
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Joi = require('joi');
const Place = require('./models/place');
const Review = require('./models/review');

const { placeSchema } = require('./schemas');

//Connecting to mongoose
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/study-rate', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(methodOverride('_method'));

//Setting EJS
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Routing
const placesRoutes = require('./routes/places')
app.use('/places', placesRoutes)

app.get('/', (req, res) => {
    res.render('home')
})

app.use(express.urlencoded({ extended: true }));

app.post('/places/:id/reviews', catchAsync(async (req, res, next) => {
    const review = new Review(req.body.review);
    await review.save();
    const place = await Place.findById(req.params.id).populate('reviews');
    place.reviews.push(review)
    await place.save()
    res.redirect(`/places/${req.params.id}`);
}))
app.delete('/places/:id/reviews/:reviewId', catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    res.redirect(`/places/${req.params.id}`)
}))
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))

})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})