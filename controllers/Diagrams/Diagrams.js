const Diagrams = require("../../models/Diagrams");
const User = require("../../models/User");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();
const crypto = require("crypto");

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

exports.AddDiagram = async (req, res, next) => {
  const { user_id, email, token, diagram_title } = req.headers;

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
    const randNum = Math.floor(Math.random() * 6) + 1;
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

        const diagrams = await Diagrams.create({
          title: diagram_title,
          img: randNum,
          name: data.Location,
          user: user_id,
        });

        diagrams.save();

        const diagrams_len = await Diagrams.find({
          user: user_id,
        }).countDocuments();

        if (diagrams_len === 5) {
          diagrams.delete();
          return res.status(400).json({ msg: "Too many diagrams" });
        }

        res.status(200).json({
          Success: "Success",
        });
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.GetDiagrams = async (req, res, next) => {
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

    const diagrams = await Diagrams.find({ user: id });

    res.status(201).json({
      Success: "Success",
      data: diagrams,
    });
  } catch (err) {
    next(err);
  }
};

exports.DeleteDiagrams = async function (req, res, next) {
  const { diagram_id, email, passToken } = req.body;

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

    const diagram = await Diagrams.findByIdAndDelete(diagram_id);
    /*
    res.status(201).json({
      Success: "Success",
    });*/
    const newName = diagram.name.replace(
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
          const deleteDiagram = await Diagrams.findByIdAndDelete(diagram_id);
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
};

exports.GetSingleDiagram = async (req, res, next) => {
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
    const diagram = await Diagrams.findById(id);

    res.status(201).json({
      success: true,
      data: diagram,
    });
  } catch (error) {
    next(error);
  }
};
