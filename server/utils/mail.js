require('./../config/config');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bigoledumbidiot@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = { transporter };
