const nodemailer = require('nodemailer');
const smtpTransport = require("nodemailer-smtp-transport");
const Staff = require('../models/staff');
const MealTicket = require('../models/mealticket');

// "use strict";

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//         user: 'pudo.promise@gmail.com', // generated ethereal user
//         pass: 'gOOgleservices@pudopc6' // generated ethereal password
//     },
//   });
//   promise2021@27

const transporter = nodemailer.createTransport(smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "pudo.promise@gmail.com",
        pass: "gOOgleservices@pudopc6"
    }
}));

const mailOptions = {
    from: "pudo.promise@gmail.com",
    to: "info.promiseudo@gmail.com ",
    subject: "Meal Ticket Request Id",
    html: "<b>Hello Promise</b>"
}

const sendEmail = transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log("Email sent: ");
    }
});

module.exports = sendEmail;


//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: "pudo.promise@gmail.com", // sender address
//     to: "promise.udo@loctech.ng", // list of receivers
//     subject: "Meal Ticket Request Id", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello </b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error)