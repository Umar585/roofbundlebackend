const User = require("../../models/User");
const Customer = require("../../models/Customer");
const Album = require("../../models/Album");
const ErrorResponse = require("../../Utils/ErrorResponse");

//Adding new Users
exports.AddUser = async (req, res, next) => {
  const { form, address, lats, lngs, email } = req.body;

  try {
    const user = await User.findOne({ email });

    //checking if the email exists
    if (!user) {
      return next(new ErrorResponse("Email Invalid", 401));
    }

    const customer = await Customer.create({
      fname: form.fname,
      lname: form.lname,
      phone: form.phone,
      email: form.email,
      scope: form.scope,
      address: address,
      lats: lats,
      lngs: lngs,
      process: "New",
      user: user._id,
    });
    await customer.save();

    res.status(201).json({
      success: true,
      data: "Customer Success",
    });
  } catch (error) {
    //next(error);
    res.status(500).json({ success: "Failed", error: error });
  }
};
//Changing new Users
exports.AddNewUser = async (req, res, next) => {
  const { id, email, val } = req.body;

  try {
    const user = await User.findOne({ email });

    //checking if the email exists
    if (!user) {
      return next(new ErrorResponse("Email Invalid", 401));
    }

    const customer = await Customer.findById(id);
    let newProccess;
    switch (val) {
      case "New":
        newProccess = "New";
        break;
      case "Quoted":
        newProccess = "Quoted";
        break;
      case "Signed":
        newProccess = "Signed";
        break;
      case "Inprogress":
        newProccess = "Inprogress";
        break;
      case "Complete":
        newProccess = "Complete";
        break;
      case "Invoiced":
        newProccess = "Invoiced";
        break;
    }
    customer.process = newProccess;
    await customer.save();

    res.status(201).json({
      success: true,
      data: "Customer added to Quote",
    });
  } catch (error) {
    next(error);
  }
};
//Getting new Users
exports.GetUsers = async (req, res, next) => {
  const { email, passToken, page } = req.body;
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

    let newProccess;
    switch (page) {
      case "New":
        newProccess = "New";
        break;
      case "Quoted":
        newProccess = "Quoted";
        break;
      case "Signed":
        newProccess = "Signed";
        break;
      case "Inprogress":
        newProccess = "Inprogress";
        break;
      case "Complete":
        newProccess = "Complete";
        break;
      case "Invoiced":
        newProccess = "Invoiced";
        break;
    }

    const customer = await Customer.find({
      user: user._id,
      process: newProccess,
    });

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};
//Getting Single Users
exports.GetSingleUsers = async (req, res, next) => {
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

    const customer = await Customer.findById(id);

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};
//Delete Users
exports.UpdateUser = async (req, res, next) => {
  const { id, form, address, coords, email, passToken } = req.body;

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

    const customer = await Customer.findByIdAndUpdate(id);

    customer.fname = form.fname;
    customer.lname = form.lname;
    customer.phone = form.phone;
    customer.email = form.email;
    customer.scope = form.scope;
    customer.address = address;
    customer.lats = coords.lat;
    customer.lngs = coords.lng;

    customer.save();

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};
//Delete Users
exports.DeleteUser = async (req, res, next) => {
  const { id, email, passToken } = req.body;
  try {
    const user = await User.findOne({ email });

    //checking if the email exists
    if (!user) {
      return next(new ErrorResponse("Email Invalid", 401));
    }
    //checking if the passToken exists
    if (user.passToken != passToken) {
      return next(new ErrorResponse("Email/PassToken Invalid", 401));
    }

    const customer = await Customer.findByIdAndDelete(id);
    const albumcustid = await Album.find({ user: id });
    albumcustid.forEach(async (element) => {
      const album = await Album.findByIdAndDelete(element._id);
    });
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
