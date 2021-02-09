const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  AddAlbum,
  AddAlbumPhoto,
  GetAlbums,
  //GetAlbumsPhotos,
  DeleteAlbum,
} = require("../../controllers/Album/Album");

const upload = multer({
  dest: "./upload",
});

router.post("/addalbum", AddAlbum);
router.post("/addalbumphoto", AddAlbumPhoto);
router.post("/getalbum", GetAlbums);
//router.post("/getalbumphotos", GetAlbumsPhotos);
router.post("/deletealbum", DeleteAlbum);

module.exports = router;
