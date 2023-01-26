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
const { array } = require('joi');

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

//Setting EJS
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

//routes
const placeRoutes = require('./routes/places')
app.use('/places', placeRoutes)

const reviewsRoutes = require('./routes/reviews')
app.use('/places/:id/reviews', reviewsRoutes)

app.get('/', (req, res) => {
    res.render('home')
})

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