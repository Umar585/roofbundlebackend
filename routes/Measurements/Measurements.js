const express = require("express");
const router = express.Router();
const {
  addRoofMeasure,
} = require("../../controllers/Measurements/Measurements");

//routes
router.post("/addroofmeasure", addRoofMeasure);

module.exports = router;
