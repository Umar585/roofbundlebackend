const User = require("../../models/User");
const Prices = require("../../models/Materials");
const LabourPrices = require("../../models/Labour");
const ErrorResponse = require("../../Utils/ErrorResponse");

exports.getMaterialsPrice = async (req, res, next) => {
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

    const price = await Prices.find({
      user: user.id,
    });

    const emptyPrice = {
      bundle: 0,
      starterBundle: 0,
      cappingBundle: 0,
      roofTopCost: 0,
      iceWater: 0,
      underLayment: 0,
      dripEdge: 0,
      ridgeVent: 0,
      roofVent: 0,
      plumbingStackMat: 0,
      binCost: 0,
    };
    let t = [];
    t.push(emptyPrice);
    if (price.length === 0) {
      console.log("ITS ALL zERO");
      res.status(201).json({
        success: true,
        data: t,
      });
    } else {
      res.status(201).json({
        success: true,
        data: price,
      });
    }
    /*
    res.status(201).json({
      success: true,
      data: price,
    });*/
  } catch (error) {
    next(error);
  }
};

exports.updateMaterialsPrice = async (req, res, next) => {
  const { pricesData, email, passToken } = req.body;

  let setBundle = setData(pricesData.bundle);
  let setStarterBundle = setData(pricesData.starterBundle);
  let setCappingBundle = setData(pricesData.cappingBundle);
  let setRoofTopCost = setData(pricesData.roofTopCost);
  let setIceWater = setData(pricesData.iceWater);
  let setUnderLayment = setData(pricesData.underLayment);
  let setDripEdge = setData(pricesData.dripEdge);
  let setRidgeVent = setData(pricesData.ridgeVent);
  let setRoofVent = setData(pricesData.roofVent);
  let setPlumbingStackMat = setData(pricesData.plumbingStackMat);
  let setBinCost = setData(pricesData.binCost);

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

    const findPrice = await Prices.find({ user: user.id });
    console.log(findPrice);
    //validation
    if (findPrice.length == 1) {
      const uPrice = await Prices.findByIdAndUpdate(findPrice);
      (uPrice.bundle = setBundle),
        (uPrice.starterBundle = setStarterBundle),
        (uPrice.cappingBundle = setCappingBundle),
        (uPrice.roofTopCost = setRoofTopCost),
        (uPrice.iceWater = setIceWater),
        (uPrice.underLayment = setUnderLayment),
        (uPrice.dripEdge = setDripEdge),
        (uPrice.ridgeVent = setRidgeVent),
        (uPrice.roofVent = setRoofVent),
        (uPrice.plumbingStackMat = setPlumbingStackMat),
        (uPrice.binCost = setBinCost),
        uPrice.save();

      res.status(201).json({
        success: "Price Updated",
        data: uPrice,
      });
    } else {
      const price = await Prices.create({
        bundle: setBundle,
        starterBundle: setStarterBundle,
        cappingBundle: setCappingBundle,
        roofTopCost: setRoofTopCost,
        iceWater: setIceWater,
        underLayment: setUnderLayment,
        dripEdge: setDripEdge,
        ridgeVent: setRidgeVent,
        roofVent: setRoofVent,
        plumbingStackMat: setPlumbingStackMat,
        binCost: setBinCost,
        user: user.id,
      });

      await price.save();

      res.status(201).json({
        success: true,
        data: price,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getLaboursPrice = async (req, res, next) => {
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

    const price = await LabourPrices.find({
      user: user.id,
    });

    const emptyPrice = {
      iceWaterLabour: 0,
      dripEdgeLabour: 0,
      ventLabour: 0,
      ridgeVentLabour: 0,
      plumbingStackMatLabour: 0,
      underLaymentLabour: 0,
      chimneyFlashingLabour: 0,
      wallFlashingLabour: 0,
      satelliteLabour: 0,
    };
    let t = [];
    t.push(emptyPrice);
    if (price.length === 0) {
      console.log("ITS ALL zERO");
      res.status(201).json({
        success: true,
        data: t,
      });
    } else {
      res.status(201).json({
        success: true,
        data: price,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateLaboursPrice = async (req, res, next) => {
  const { pricesData, email, passToken } = req.body;

  let setIceWaterLabour = setData(pricesData.iceWaterLabour);
  let setDripEdgeLabour = setData(pricesData.dripEdgeLabour);
  let setVentLabour = setData(pricesData.ventLabour);
  let setRidgeVentLabour = setData(pricesData.ridgeVentLabour);
  let setPlumbingStackMatLabour = setData(pricesData.plumbingStackMatLabour);
  let setUnderLaymentLabour = setData(pricesData.underLaymentLabour);
  let setChimneyFlashingLabour = setData(pricesData.chimneyFlashingLabour);
  let setWallFlashingLabour = setData(pricesData.wallFlashingLabour);
  let setSatelliteLabour = setData(pricesData.satelliteLabour);

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

    const findPrice = await LabourPrices.find({ user: user.id });

    //validation
    if (findPrice.length == 1) {
      const uPrice = await LabourPrices.findByIdAndUpdate(findPrice);
      (uPrice.iceWaterLabour = setIceWaterLabour),
        (uPrice.dripEdgeLabour = setDripEdgeLabour),
        (uPrice.ventLabour = setVentLabour),
        (uPrice.ridgeVentLabour = setRidgeVentLabour),
        (uPrice.plumbingStackMatLabour = setPlumbingStackMatLabour),
        (uPrice.underLaymentLabour = setUnderLaymentLabour),
        (uPrice.chimneyFlashingLabour = setChimneyFlashingLabour),
        (uPrice.wallFlashingLabour = setWallFlashingLabour),
        (uPrice.satelliteLabour = setSatelliteLabour),
        uPrice.save();

      res.status(201).json({
        success: "Price Updated",
        data: uPrice,
      });
    } else {
      const price = await LabourPrices.create({
        iceWaterLabour: setIceWaterLabour,
        dripEdgeLabour: setDripEdgeLabour,
        ventLabour: setVentLabour,
        ridgeVentLabour: setRidgeVentLabour,
        plumbingStackMatLabour: setPlumbingStackMatLabour,
        underLaymentLabour: setUnderLaymentLabour,
        chimneyFlashingLabour: setChimneyFlashingLabour,
        wallFlashingLabour: setWallFlashingLabour,
        satelliteLabour: setSatelliteLabour,
        user: user.id,
      });

      await price.save();

      res.status(201).json({
        success: true,
        data: price,
      });
    }
  } catch (error) {
    next(error);
  }
};

function setData(val) {
  let setVal;
  val === "" || val === undefined ? (setVal = 0) : (setVal = val);
  return setVal;
}
