const express = require('express');
const app = express();

const path = require('path');
const methodOverride = require('method-override');

app.get('/', (req, res) => {
    res.send('Reached homeee')
})

app.get('/places', (req, res) => {
    res.send('All of the Campground places')
})

app.get('/places/new', (req, res) => {
    res.send('Add new place')
})

app.get('/places/:id', (req, res) => {
    res.send('Showing place ' + req.params.id)
})

app.get('/places/:id/edit', (req, res) => {
    res.send('Looking at campground ' + req.params.id)
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})