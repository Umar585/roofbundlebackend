const express = require("express");
const router = express.Router();
const {
  addRoofMeasure,
  addSelectionsMeasure,
  getAllMeasure,
} = require("../../controllers/Measurements/Measurements");

//routes
router.post("/addroofmeasure", addRoofMeasure);
router.post("/addselectionsmeasure", addSelectionsMeasure);
router.post("/addallmeasure", getAllMeasure);

module.exports = router;
