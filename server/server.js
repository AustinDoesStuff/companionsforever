require('./../server/config/config');

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const dropin = require('braintree-web-drop-in');

const { savePuppers } = require('./utils/refresh');
const { Pupper } = require('./models/pupper');
const { transporter } = require('./utils/mail');

const publicPath = path.join(__dirname, '..', '/public');
const partialsPath = path.join(__dirname, '..', '/views/partials');
const port = process.env.PORT || 3000;

const app = express();

// dropin.create(
//   {
//     /* options */
//   },
//   callback
// ); Drop-in Braintree

app.use(express.static(publicPath));

hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));

savePuppers();
setInterval(() => { savePuppers(); }, 900000);

app.get('', async (req, res) => {
  const pup = await Pupper.find({}).limit(3);
  res.render('index.hbs', {
    pup,
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
  res.render('donate.hbs');
});

app.get('/contact', (req, res) => {
  res.render('contact.hbs');
});

app.post('/contact', (req, res) => {
  const { email } = req.body;
  const { name } = req.body.name;
  const body = req.body.message;

  const mailOptions = {
    from: 'bigoledumbidiot@gmail.com',
    to: email,
    subject: `${name} wants to talk`,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (!error) {
      res.render('thankyou.hbs', {
        title: 'Thank you so much!',
        body: 'We will be in contact soon',
      });
    } else {
      res.render('thankyou.hbs', {
        title: 'Oops! Ya broke it!',
        body: 'Just kidding, something went wrong, try submitting it again'
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
