const express = require("express");
const app = express();
const path = require("path");
//cors for policy
const cors = require("cors");

require("dotenv").config();

//use cases for app to use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Main Route");
});

//routes
app.use("/api/mailchimp", require("./routes/MailChimp/mailchimp"));
app.use("/api/stripe", require("./routes/Stripe/stripe"));

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listing on port ${port}`));

/* UN_COMMENT BEFORE UPLOADING TO AWS ****IMPORTANT****
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});*/
