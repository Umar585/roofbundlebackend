//env file
require("dotenv").config();
//Stripe
const Stripe = require("stripe");
//nodemailer for sending emails
const nodemailer = require("nodemailer");

const stripe = new Stripe(process.env.STRIPE_SECRETKEY);
//get year for date in footer
const newDate = new Date();
const currentYear = newDate.getFullYear();

exports.stripe = async (req, res) => {
  const { id, amount, email, address, company, phone, country } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "CAD",
      description: `${email} - RoofBundle Report`,
      payment_method: id,
      confirm: true,
      receipt_email: email,
    });

    let transporter = nodemailer.createTransport({
      port: process.env.AWS_PORT,
      host: process.env.AWS_HOST,
      auth: {
        user: process.env.AWS_USER,
        pass: process.env.AWS_PASS,
      },
      debug: true,
    });

    //Sending Email to Customer
    let mailOptions = {
      from: "Roofbundle Reports <reports@roofbundle.com>",
      to: "techdeveloper585@gmail.com",
      subject: "RoofBundle Report",
      html:
        '<div style="max-width: 500px; text-align: center; display: block; margin-left: auto; margin-right: auto;">' +
        '<img src="cid:unique@kreata.ee" style="width: 200px;"/>' +
        "<h1>Payment Processed</h1>" +
        "<p>The following payment has been processed.</p>" +
        '<p style="margin-top: 50px">Payment Amount: <br/><b>$15.00 (CAD)</b></p>' +
        '<div style="display: inline-block; margin-top: 100px;">' +
        '<a href="https://www.facebook.com/Roofbundle/"><img src="cid:unique@fb.ee" style="width: 30px; margin-right: 5px;"/></a>' +
        '<a href="https://www.instagram.com/roofbundle/"><img src="cid:unique@insta.ee" style="width: 30px; margin-right: 5px;"/></a>' +
        '<a href="https://twitter.com/roofbundle"><img src="cid:unique@twitter.ee" style="width: 30px;"/></a>' +
        "</div>" +
        "<p>&copy; RoofBundle Inc. " +
        currentYear +
        " | 100 Innovation Dr #441, Winnipeg, MB R3T 6G2</p>" +
        "<p>This email was sent to " +
        email +
        "</p>" +
        "</div>",
      attachments: [
        {
          filename: "Logo.png",
          path: path.join(__dirname, "client/build/Logo/Logo.png"),
          cid: "unique@kreata.ee",
        },
        {
          filename: "facebook.png",
          path: path.join(__dirname, "client/build/Logo/facebook.png"),
          cid: "unique@fb.ee",
        },
        {
          filename: "instagram.png",
          path: path.join(__dirname, "client/build/Logo/instagram.png"),
          cid: "unique@insta.ee",
        },
        {
          filename: "twitter.png",
          path: path.join(__dirname, "client/build/Logo/twitter.png"),
          cid: "unique@twitter.ee",
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent To Client: " + info.response);
      }
    });

    //Sending Email to Ourselfs
    mailOptions = {
      from: "Roofbundle Reports <reports@roofbundle.com>",
      to: "reports@roofbundle.com",
      subject: "RoofBundle Report",
      html:
        '<div style="display: inline-flex;"> <div> Report Address:<br /> Company Name:<br /> Phone Number:<br /> Email:<br /> Country:</div>' +
        '<div style="margin-left: 50px;">' +
        address +
        "<br />" +
        company +
        "<br />" +
        phone +
        "<br />" +
        email +
        "<br />" +
        country +
        "</div></div>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent To OurSelfs: " + info.response);
      }
    });

    return res.status(200).json({
      confirm: "Payment_Success",
    });
  } catch (err) {}
};
