const mongoose = require('mongoose');
const Place = require('../models/place');
const names = require('./names');
const locations = require('./locations');
const tags = require('./tags');

mongoose.connect('mongodb://localhost:27017/study-rate', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const randomize = (arr) => arr[Math.floor(Math.random() * arr.length)];

const createPlace = async function () {
    await Place.deleteMany();

    for (let i = 0; i < 50; i++) {
        const newPlace = new Place({
            title: randomize(names),
            averageRating: Math.round(Math.random() * 5, 2),
            location: randomize(locations),
            tags: randomize(tags)
        });
        await newPlace.save();
    }
}

createPlace();