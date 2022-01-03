var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var user = require('../models/user');
var user = require('../models/fournisseur');


router.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
      console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
      res.send(info);
    });
  });
  
  async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'ameninemlaghi@gmail.com',
        pass: 'Amn@123'
      }
    });
  
    let mailOptions = {
      from: user.email, // sender address
      to: 'ameninemlaghi@gmail.com', // list of receivers
      subject: user.sub, // Subject line
      html: `<h3> ${user.email}</h3><br>
      <h4>  ${user.msg}    </h4>`
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
  
    callback(info);
  }
  
module.exports = router