const User = require("../../models/User");
const Album = require("../../models/Album");
const ErrorResponse = require("../../Utils/ErrorResponse");

const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const gridFsStorage = require("multer-gridfs-storage");
const grid = require("gridfs-stream");
const methodOverride = require("method-override");

//Adding new Users
exports.AddAlbum = async (req, res, next) => {
  const { title, email, passToken } = req.body;
  const randNum = Math.floor(Math.random() * 6) + 1;
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

    const album = await Album.create({
      title: title,
      img: randNum,
      user: user._id,
    });

    await album.save();

    res.status(201).json({
      success: true,
      data: album,
    });
  } catch (error) {
    next(error);
  }
};
//Added Single Photos
exports.AddAlbumPhoto = async (req, res, next) => {
  const { image } = req.body;
  console.log(image);
};
//Getting Single Album
exports.GetAlbums = async (req, res, next) => {
  const { email, passToken } = req.body;

  try {
    const user = await User.findOne({ email });

    //checking if the email exists
    if (!user) {
      return next(new ErrorResponse("Email Invalid", 401));
    }
    //checking if the passToken and email exists
    if (user.passToken != passToken) {
      return next(new ErrorResponse("Email/Token Invalid", 401));
    }
    const id = user._id;
    const album = await Album.find({ user: id });

    res.status(201).json({
      success: true,
      data: album,
    });
  } catch (error) {
    next(error);
  }
};

//Getting Single Album
exports.GetAlbumsPhotos = async (req, res, next) => {
  const { email, passToken } = req.body;
  console.log();
  /*
  try {
    const user = await User.findOne({ email });

    //checking if the email exists
    if (!user) {
      return next(new ErrorResponse("Email Invalid", 401));
    }
    //checking if the passToken and email exists
    if (user.passToken != passToken) {
      return next(new ErrorResponse("Email/Token Invalid", 401));
    }
    const id = user._id;
    const album = await Album.find({ user: id });

    res.status(201).json({
      success: true,
      data: album,
    });
  } catch (error) {
    next(error);
  }*/
};
//Delete Album
exports.DeleteAlbum = async (req, res, next) => {
  const { id, email, passToken } = req.body;

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

    const album = await Album.findByIdAndDelete(id);

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
