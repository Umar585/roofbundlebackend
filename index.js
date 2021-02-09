//variables
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/error");

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//auth routes
const priceRoute = require("./routes/Price/Price");
const authRoutes = require("./routes/Auth");
const CustomerRoutes = require("./routes/Customer/Customer");
const AlbumRoutes = require("./routes/Album/Album");

//Main Route
app.get("/", (req, res) => {
  res.send("Main Route");
});
//routes
app.use("/api/price", priceRoute);
app.use("/api/auth", authRoutes);
app.use("/api/customer", CustomerRoutes);
app.use("/api/private", require("./routes/private"));
app.use("/api/album", AlbumRoutes);

//Error Handle should be at the end
app.use(errorHandler);
// connecting to db

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DB Connected"));

//listing to port
const server = app.listen(port, console.log(`Listing on port ${port}`));

process.on("undahdledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
