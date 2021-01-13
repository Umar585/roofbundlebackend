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

/*checking if the project is in production mode
const environment = process.env.NODE_ENV || "development";
if (environment) {
  app.use(express.static(path.join(__dirname, "Client/build")));
}*/

app.use(express.static(path.join(__dirname, "Client/build")));

app.get("/", (req, res) => {
  res.send("Main Route");
});

//mailchimp
app.use("/api/mailchimp", require("./routes/MailChimp/mailchimp"));

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listing on port ${port}`));
