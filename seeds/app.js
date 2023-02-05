const mongoose = require('mongoose');
const Place = require('../models/place');
const names = require('./names');
const locations = require('./locations');
const tags = require('./tags');

const geocodeService = require('@mapbox/mapbox-sdk/services/geocoding');
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY29kaW5nNDU0NSIsImEiOiJjbGRxY214dzIwdjc0M3ZzNTNsemZhbnJuIn0.b_BkyDTHGrRZWrC9BphG3A'
const geocodeClient = geocodeService({ accessToken: MAPBOX_TOKEN });

mongoose.set('strictQuery', true);
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
        const name = randomize(names);
        const locationData = await geocodeClient.forwardGeocode({
            query: name + " Atlanta, Georgia",
            limit: 1
        }).send()
            .catch(e => {
                console.log(e);
            })
        const newPlace = new Place({
            title: name,
            averageRating: Math.round(Math.random() * 5, 2),
            address: locationData.body.features[0].place_name,
            tags: randomize(tags),
            author: '63d74c93446b03d74d81f744',
            images: [{
                url: 'https://source.unsplash.com/collection/4480212',
                filename: "BasicImage"
            }, {
                url: 'https://source.unsplash.com/collection/j9rrohIHD94',
                filename: "BasicImage"
            }],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta voluptatibus dolor deserunt maxime ad iure magni autem, expedita hic sed et quia perspiciatis rem beatae cumque consequatur nemo, iste cupiditate.',
            geometry: locationData.body.features[0].geometry
        });
        await newPlace.save();
    }
}

createPlace();