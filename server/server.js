require('./../server/config/config');

const express = require('express');
const hbs = require('hbs');
const nodeMailer = require('nodemailer');

const {refresh, savePuppers} = require('./utils/refresh');
const {Pupper} = require('./models/pupper'); 

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

savePuppers();
setInterval(() => { savePuppers() }, 900000);

app.get('', async (req, res) => {
    const pup = await Pupper.find({}).limit(3);
    res.render('index.hbs', {
        pup
    });
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
    const email = req.body.email;
    const name = req.body.name;
    const body = req.body.message;

    
});

app.listen(port, () => {
    console.log(`Running on ${port}`);
});