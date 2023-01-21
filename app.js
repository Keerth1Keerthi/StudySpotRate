const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

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
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/places', (req, res) => {
    res.render('places/index')
})


app.get('/places/new', (req, res) => {
    res.render('places/new')
})
app.post('places', (req, res) => {
    res.send('making post')
})

app.get('/places/:id', (req, res) => {
    res.render('places/show')
})

app.get('/places/:id/edit', (req, res) => {
    res.render('places/edit')
})
app.put('/places/:id', (req, res) => {
    res.send('editing place')
})
app.delete('/places/:id', (req, res) => {
    res.send('deleting place')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})