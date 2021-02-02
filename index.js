//variables
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//auth routes
const authRoutes = require("./routes/Auth");
const { db } = require("./models/User");

//Main Route
app.get("/", (req, res) => {
  res.send("Main Route");
});
//routes
app.use("/api/price", require("./routes/Price/Price"));
app.use("/api/auth", authRoutes);

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//listing to port
app.listen(port, console.log(`Listing on port ${port}`));
