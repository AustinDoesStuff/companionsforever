const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bigoledumbidiot@gmail.com',
        pass: 'yourpassword'
    }
});


const sendInfo = (email, name, body) => {
    var mailOptions = {
        from: 'bigoledumbidiot@gmail.com',
        to: email,
        subject: `${name} wants to talk`,
        text: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};