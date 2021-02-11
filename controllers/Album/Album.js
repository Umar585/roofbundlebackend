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
//Added Single Photos
exports.AddAlbumPhoto = async (req, res, next) => {
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
    //if file is there
    if (req.files === null) {
      return res.status(400).json({ msg: "No file found" });
    }

    const file = req.files.file;

    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      const fileName = Date.now() + file.name;
      file.mv(
        `${__dirname}../../../../Client/public/uploads/${fileName}`,
        async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          try {
            const photo = await Photos.create({
              name: fileName,
              album: id,
            });

            await photo.save();

            res.json({
              fileName: fileName,
              filePath: `/uploads/${fileName}`,
            });
          } catch (err) {
            next(err);
          }
        }
      );
    } else {
      return res.status(400).json({ msg: "Incorrect file type" });
    }
  } catch (err) {
    next(err);
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

    res.status(201).json({
      success: true,
      data: photo,
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
