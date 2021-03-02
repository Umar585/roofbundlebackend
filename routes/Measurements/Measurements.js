const express = require("express");
const router = express.Router();
const {
  addRoofMeasure,
  addSelectionsMeasure,
} = require("../../controllers/Measurements/Measurements");

//routes
router.post("/addroofmeasure", addRoofMeasure);
router.post("/addselectionsmeasure", addSelectionsMeasure);

module.exports = router;
