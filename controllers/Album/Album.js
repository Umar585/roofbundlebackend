const User = require("../../models/User");
const Album = require("../../models/Album");
const ErrorResponse = require("../../Utils/ErrorResponse");
const fs = require("fs");

//Adding new Users
exports.AddAlbum = async (req, res, next) => {
  const { form, email, passToken } = req.body;

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

    console.log(form.image);

    /*const album = await Album.create({
      title: form.title.trim(),
      main_photo: {
        data: fs.readFileSync(path.join(__dirname + "/uploads/" + form.image.filename)),
        contentType: "image/png",
      },
      user: user._id,
    });

    await album.save();

    res.status(201).json({
      success: true,
      data: album,
    });*/
  } catch (error) {
    next(error);
  }
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
