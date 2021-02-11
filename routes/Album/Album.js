const express = require("express");
const router = express.Router();
const {
  AddAlbum,
  AddAlbumPhoto,
  GetAlbums,
  GetAlbumsPhotos,
  DeleteAlbum,
} = require("../../controllers/Album/Album");

router.post("/addalbum", AddAlbum);
router.post("/addalbumphoto", AddAlbumPhoto);
router.post("/getalbum", GetAlbums);
router.post("/getalbumphotos", GetAlbumsPhotos);
router.post("/deletealbum", DeleteAlbum);

module.exports = router;
