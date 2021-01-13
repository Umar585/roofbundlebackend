const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

//checking if the project is in production mode
const environment = process.env.NODE_ENV || "development";
if (environment) {
  app.use(express.static(path.join(__dirname, "Client/build")));
}

app.get("/", (req, res) => {
  res.send("Main Route");
});

//mailchimp
app.use("/api/mailchimp", require("./routes/MailChimp/mailchimp"));

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listing on port ${port}`));
