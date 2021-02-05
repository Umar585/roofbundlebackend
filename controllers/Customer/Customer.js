const User = require("../../models/User");
const Customer = require("../../models/Customer");
const ErrorResponse = require("../../Utils/ErrorResponse");

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

exports.GetUsers = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    //checking if the email exists
    if (!user) {
      return next(new ErrorResponse("Email Invalid", 401));
    }
    const customer = await Customer.find({ user: user._id });

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};
