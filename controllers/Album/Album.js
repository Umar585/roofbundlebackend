const User = require("../../models/User");
const Album = require("../../models/Album");
const Photos = require("../../models/Photos");
const ErrorResponse = require("../../Utils/ErrorResponse");

//Adding new Users
exports.AddAlbum = async (req, res, next) => {
  const { id, title, email, passToken } = req.body;
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
      user: id,
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
//Getting Single Album
exports.GetAlbums = async (req, res, next) => {
  const { id, email, passToken } = req.body;

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
    //const id = user._id;
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
  const { id, email, passToken } = req.body;

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

    const photo = await Photos.find({ album: id });
    const album = await Album.findById({ _id: id });

    res.status(201).json({
      success: true,
      data: photo,
      album: album,
    });
  } catch (error) {
    next(error);
  }
};
//Delete Album
exports.DeleteAlbum = async (req, res, next) => {
  const { album_id, email, passToken } = req.body;

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

    const album = await Album.findByIdAndDelete(album_id);

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetSinglePhoto = async (req, res, next) => {
  const { id, email, passToken } = req.body;

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
    //const id = user._id;
    const photo = await Photos.findById(id);

    res.status(201).json({
      success: true,
      data: photo.name,
    });
  } catch (error) {
    next(error);
  }
};
