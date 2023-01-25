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
const { placeSchema } = require('./schemas')

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

const validatePlace = (req, res, next) => {
    const { error } = placeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next()
    }
}

app.get('/', (req, res) => {
    res.render('home')
})

app.use(express.urlencoded({ extended: true }));


app.get('/places', async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', { places })
})


app.get('/places/new', (req, res) => {
    res.render('places/new')
})
app.post('/places', validatePlace, catchAsync(async (req, res) => {
    const place = new Place(req.body.place)
    console.log(await place.save());
    res.redirect('places')
}))

app.get('/places/:id', catchAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/show', { place })
}))

app.get('/places/:id/edit', catchAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/edit', { place })
}))

app.put('/places/:id', validatePlace, catchAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findByIdAndUpdate(id, { ...req.body.place }, { new: true });
    res.redirect(`/places/${id}`);
}))
app.delete('/places/:id', catchAsync(async (req, res) => {
    const place = await Place.findByIdAndDelete(req.params.id);
    res.redirect('/places')
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