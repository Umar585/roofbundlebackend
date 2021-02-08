const express = require("express");
const router = express.Router();
const { AddAlbum, GetAlbums } = require("../../controllers/Album/Album");

router.post("/addalbum", AddAlbum);
router.post("/getalbum", GetAlbums);

module.exports = router;
