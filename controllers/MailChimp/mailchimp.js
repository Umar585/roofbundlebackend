//env file
require("dotenv").config();
//mailchimp
const mailChimp = require("mailchimp-api-v3");

const mc_api_key = process.env.MAILCHIMP_API_KEY;
const list_id = process.env.LIST_ID;
const mchimp = new mailChimp(mc_api_key);

exports.mailchimp = (req, res) => {
  mchimp
    .post(`/lists/${list_id}/members/`, {
      email_address: req.query.email,
      status: "subscribed",
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      if (err.title === "Forgotten Email Not Subscribed") {
        return res.send(err.status);
      } else if (err.title === "Member Exists") {
        return res.send(err.status);
      }
      console.log(err.status);
    });
};
