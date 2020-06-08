const User = require("../models/auth.model");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
// Custom error handler to get useful error from database error
const { errorHandler } = require("../helpers/dbErrorHandling");
// I will use nodemail for sending mail.
const nodemailer = require("nodemailer");

exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({
      email,
    }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          errors: "Email is taken",
        });
      }
    });

    const token = jwt.sign(
      {
        name,
        email,
        password
      },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "5m",
      }
    );

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    //Verifying the Nodemailer Transport instance
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take messages");
      }
    });
    let mailOptions = {
      from: `"SurajKarki" ${process.env.USER}`,
      to: email,
      subject: "Account activation link",
      body: "Thank you for choosing us !",
      html: `
      <h1>Please use the following to activate your account</h1>
      <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
      <hr />
      <p>This email may containe sensetive information</p>
      <p>${process.env.CLIENT_URL}</p>
  `,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(400).json({
          success: false,
          errors: errorHandler(error),
        });
      }
      else  {
        res.status(200).json({
          success: true,
          message: `Email has been sent to ${email}`,
        })
      }
    });
  }
};
