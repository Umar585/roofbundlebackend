const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();
const crypto = require("crypto");

const User = require("../../models/User");
const Photos = require("../../models/Photos");

const {
  AddAlbum,
  GetAlbums,
  GetAlbumsPhotos,
  DeleteAlbum,
  GetSinglePhoto,
} = require("../../controllers/Album/Album");

//router.post("/addalbum", AddAlbum);
router.post("/getalbum", GetAlbums);
router.post("/getalbumphotos", GetAlbumsPhotos);
//router.post("/deletealbum", DeleteAlbum);
router.post("/getsinglePhoto", GetSinglePhoto);

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

//const upload = multer({ storage }).single("image");
const upload = multer({ storage }).single("image");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_SECRET_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ca-central-1",
  Acl: "public-read",
});

router.post("/addalbumphoto", upload, async function (req, res, next) {
  const { album_id, email, token } = req.headers;

  try {
    const user = await User.findOne({ email });

    //checking if the email exists
    if (!user) {
      return next(new ErrorResponse("Email Invalid", 401));
    }
    //checking if the email exists
    if (user.passToken != token) {
      return next(new ErrorResponse("PassToken Invalid", 401));
    }
    //if file is there
    if (req.files === null) {
      return res.status(400).json({ msg: "No file found" });
    }

    let fileName = req.files.image.name.split(".");
    const fileType = fileName[fileName.length - 1];
    const randKey = crypto.randomBytes(10).toString("hex");
    if (
      fileType === "png" ||
      fileType == "jpg" ||
      fileType == "jpeg" ||
      fileType == "JPG" ||
      fileType == "Heic" ||
      fileType == "HEIC"
    ) {
      const params = {
        Bucket: "roofbundlesecondbucket",
        Key: `${randKey}.${fileType}`,
        Body: req.files.image.data,
        Acl: "public-read",
      };

      s3.upload(params, async (error, data) => {
        if (error) {
          res.status(500).send(err);
        }

        const photo = await Photos.create({
          name: data.Location,
          album: album_id,
        });

        photo.save();

        const photo_len = await Photos.find({
          album: album_id,
        }).countDocuments();

        if (photo_len === 25) {
          photo.delete();
          return res.status(400).json({ msg: "Too many photos" });
        }

        res.status(200).json({
          file: data.Location,
        });
      });
    } else {
      return res.status(400).json({ msg: "Incorrect File Type" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/deletealbumphoto", async function (req, res, next) {
  const { photo_id, email, passToken } = req.body;
  try {
    const user = await User.findOne({ email });
    //checking if the email exists
    if (!user) {
      return next(new ErrorResponse("Email Invalid", 401));
    }
    //checking if the email exists
    if (user.passToken != passToken) {
      return next(new ErrorResponse("PassToken Invalid", 401));
    }

    const photo = await Photos.findById(photo_id);
    const newName = photo.name.replace(
      "https://roofbundlesecondbucket.s3.ca-central-1.amazonaws.com/",
      ""
    );

    const params = {
      Bucket: "roofbundlesecondbucket",
      Key: newName,
    };
    s3.deleteObject(params, async (err, data) => {
      if (err) {
        console.log("ERR: ", err);
        return next(new ErrorResponse("Connection Lost", 500));
        // an error occurred
      } else {
        try {
          const deletePhoto = await Photos.findByIdAndDelete(photo_id);
          res.status(201).json({
            success: true,
          });
        } catch (err) {
          return next(new ErrorResponse("Database Connection Error", 500));
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
