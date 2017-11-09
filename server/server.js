require('./../server/config/config');

const express = require('express');
const hbs = require('hbs');

const {refresh, savePuppers} = require('./utils/refresh');
const {getPups} = require('./utils/petfinder');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

savePuppers();
refresh();

app.get('', (req, res) => {
    getPups().then((pup) => {
        res.render('index.hbs', {
            pup
        });
    }).catch((e) => console.log(e));
});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.get('/available', (req, res) => {
    res.render('availble.hbs');
});

app.get('/available/:id', (req, res) => {
    res.render('indiviual.hbs');
});

app.get('/donate', (req, res) => {
    res.render('donate.hbs')
});

app.get('/contact', (req, res) => {
    res.render('contact.hbs');
});

app.post('/contact', (req, res) => {
    //mail stuff
});

app.listen(port, () => {
    console.log(`Running on ${port}`);
});