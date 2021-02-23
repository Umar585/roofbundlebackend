const express = require("express");
const router = express.Router();
const {
  getMaterialsPrice,
  updateMaterialsPrice,
  getLaboursPrice,
  updateLaboursPrice,
} = require("../../controllers/Price/Price");

router.post("/materials", getMaterialsPrice);
router.post("/materialpriceupdate", updateMaterialsPrice);
router.post("/labours", getLaboursPrice);
router.post("/labourpriceupdate", updateLaboursPrice);

module.exports = router;
