const User = require("../../models/User");
const Customer = require("../../models/Customer");
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
      process: "new",
      user: user._id,
    });
    await customer.save();

    res.status(201).json({
      success: true,
      data: "Customer Success",
    });
  } catch (error) {
    next(error);
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
    console.log(val);
    let newProccess;
    switch (val) {
      case "new":
        newProccess = "new";
        break;
      case "quoted":
        newProccess = "quoted";
        break;
      case "signed":
        newProccess = "signed";
        break;
      case "inprogress":
        newProccess = "inprogress";
        break;
      case "complete":
        newProccess = "complete";
        break;
      case "invoiced":
        newProccess = "invoiced";
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
      case "new":
        newProccess = "new";
        break;
      case "quoted":
        newProccess = "quoted";
        break;
      case "signed":
        newProccess = "signed";
        break;
      case "inprogress":
        newProccess = "inprogress";
        break;
      case "complete":
        newProccess = "complete";
        break;
      case "invoiced":
        newProccess = "invoiced";
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
  const { customerID, email, passToken } = req.body;

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

    const customer = await Customer.findById(customerID);

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
  const { customerID, email } = req.body;

  try {
    const user = await User.findOne({ email });

    //checking if the email exists
    if (!user) {
      return next(new ErrorResponse("Email Invalid", 401));
    }

    const customer = await Customer.findByIdAndDelete(customerID);

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
