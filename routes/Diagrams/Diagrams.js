const express = require("express");
const router = express.Router();

const {
  AddDiagram,
  GetDiagrams,
  DeleteDiagrams,
  GetSingleDiagram,
} = require("../../controllers/Diagrams/Diagrams");

router.post("/addDiagram", AddDiagram);
router.post("/getDiagram", GetDiagrams);
router.post("/deleteDiagram", DeleteDiagrams);
router.post("/getSingleDiagram", GetSingleDiagram);
module.exports = router;
