const express = require("express");
const app = express();

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Main Route");
});

//mailchimp
app.use("/api/mailchimp", require("./routes/MailChimp/mailchimp"));

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listing on port ${port}`));
