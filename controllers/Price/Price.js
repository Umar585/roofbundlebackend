const User = require("../../models/User");
const Prices = require("../../models/Prices");
const ErrorResponse = require("../../Utils/ErrorResponse");

exports.getPrice = async (req, res, next) => {
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

    const price = await Prices.find({
      user: id,
    });

    res.status(201).json({
      success: true,
      data: price,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePrice = async (req, res, next) => {
  const { id, pricesData, email, passToken } = req.body;

  let setBundle,
    setStarterBundle,
    setCappingBundle,
    setRoofTopCost,
    setIceWater,
    setUnderLayment,
    setDripEdge,
    setRidgeVent,
    setRoofVent,
    setPlumbingStackMat,
    setBinCost,
    setIceWaterLabour,
    setDripEdgeLabour,
    setVentLabour,
    setRidgeVentLabour,
    setPlumbingStackMatLabour,
    setUnderLaymentLabour,
    setChimneyFlashingLabour,
    setWallFlashingLabour,
    setSatelliteLabour;

  if (pricesData.bundle === "" || pricesData.bundle === undefined) {
    setBundle = 0;
  } else {
    setBundle = pricesData.bundle;
  }

  if (
    pricesData.starterBundle === "" ||
    pricesData.starterBundle === undefined
  ) {
    setStarterBundle = 0;
  } else {
    setStarterBundle = pricesData.starterBundle;
  }

  if (
    pricesData.cappingBundle === "" ||
    pricesData.cappingBundle === undefined
  ) {
    setCappingBundle = 0;
  } else {
    setCappingBundle = pricesData.cappingBundle;
  }

  if (pricesData.roofTopCost === "" || pricesData.roofTopCost === undefined) {
    setRoofTopCost = 0;
  } else {
    setRoofTopCost = pricesData.roofTopCost;
  }

  if (pricesData.iceWater === "" || pricesData.iceWater === undefined) {
    setIceWater = 0;
  } else {
    setIceWater = pricesData.iceWater;
  }

  if (pricesData.underLayment === "" || pricesData.underLayment === undefined) {
    setUnderLayment = 0;
  } else {
    setUnderLayment = pricesData.underLayment;
  }

  if (pricesData.dripEdge === "" || pricesData.dripEdge === undefined) {
    setDripEdge = 0;
  } else {
    setDripEdge = pricesData.dripEdge;
  }

  if (pricesData.ridgeVent === "" || pricesData.ridgeVent === undefined) {
    setRidgeVent = 0;
  } else {
    setRidgeVent = pricesData.ridgeVent;
  }

  if (pricesData.roofVent === "" || pricesData.roofVent === undefined) {
    setRoofVent = 0;
  } else {
    setRoofVent = pricesData.roofVent;
  }

  if (
    pricesData.plumbingStackMat === "" ||
    pricesData.plumbingStackMat === undefined
  ) {
    setPlumbingStackMat = 0;
  } else {
    setPlumbingStackMat = pricesData.plumbingStackMat;
  }

  if (pricesData.binCost === "" || pricesData.binCost === undefined) {
    setBinCost = 0;
  } else {
    setBinCost = pricesData.binCost;
  }

  if (
    pricesData.iceWaterLabour === "" ||
    pricesData.iceWaterLabour === undefined
  ) {
    setIceWaterLabour = 0;
  } else {
    setIceWaterLabour = pricesData.iceWaterLabour;
  }

  if (
    pricesData.dripEdgeLabour === "" ||
    pricesData.dripEdgeLabour === undefined
  ) {
    setDripEdgeLabour = 0;
  } else {
    setDripEdgeLabour = pricesData.dripEdgeLabour;
  }

  if (pricesData.ventLabour === "" || pricesData.ventLabour === undefined) {
    setVentLabour = 0;
  } else {
    setVentLabour = pricesData.ventLabour;
  }

  if (
    pricesData.ridgeVentLabour === "" ||
    pricesData.ridgeVentLabour === undefined
  ) {
    setRidgeVentLabour = 0;
  } else {
    setRidgeVentLabour = pricesData.ridgeVentLabour;
  }

  if (
    pricesData.plumbingStackMatLabour === "" ||
    pricesData.plumbingStackMatLabour === undefined
  ) {
    setPlumbingStackMatLabour = 0;
  } else {
    setPlumbingStackMatLabour = pricesData.plumbingStackMatLabour;
  }

  if (
    pricesData.underLaymentLabour === "" ||
    pricesData.underLaymentLabour === undefined
  ) {
    setUnderLaymentLabour = 0;
  } else {
    setUnderLaymentLabour = pricesData.underLaymentLabour;
  }

  if (
    pricesData.chimneyFlashingLabour === "" ||
    pricesData.chimneyFlashingLabour === undefined
  ) {
    setChimneyFlashingLabour = 0;
  } else {
    setChimneyFlashingLabour = pricesData.chimneyFlashingLabour;
  }

  if (
    pricesData.wallFlashingLabour === "" ||
    pricesData.wallFlashingLabour === undefined
  ) {
    setWallFlashingLabour = 0;
  } else {
    setWallFlashingLabour = pricesData.wallFlashingLabour;
  }

  if (
    pricesData.satelliteLabour === "" ||
    pricesData.satelliteLabour === undefined
  ) {
    setSatelliteLabour = 0;
  } else {
    setSatelliteLabour = pricesData.satelliteLabour;
  }

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

    const findPrice = await Prices.find({ user: id });

    //validation
    if (findPrice.length == 1) {
      const updatePrice = await Prices.findByIdAndUpdate(findPrice);
      (updatePrice.bundle = setBundle),
        (updatePrice.starterBundle = setStarterBundle),
        (updatePrice.cappingBundle = setCappingBundle),
        (updatePrice.roofTopCost = setRoofTopCost),
        (updatePrice.iceWater = setIceWater),
        (updatePrice.underLayment = setUnderLayment),
        (updatePrice.dripEdge = setDripEdge),
        (updatePrice.ridgeVent = setRidgeVent),
        (updatePrice.roofVent = setRoofVent),
        (updatePrice.plumbingStackMat = setPlumbingStackMat),
        (updatePrice.binCost = setBinCost),
        (updatePrice.iceWaterLabour = setIceWaterLabour),
        (updatePrice.dripEdgeLabour = setDripEdgeLabour),
        (updatePrice.ventLabour = setVentLabour),
        (updatePrice.ridgeVentLabour = setRidgeVentLabour),
        (updatePrice.plumbingStackMatLabour = setPlumbingStackMatLabour),
        (updatePrice.underLaymentLabour = setUnderLaymentLabour),
        (updatePrice.chimneyFlashingLabour = setChimneyFlashingLabour),
        (updatePrice.wallFlashingLabour = setWallFlashingLabour),
        (updatePrice.satelliteLabour = setSatelliteLabour),
        updatePrice.save();

      res.status(201).json({
        success: "Price Updated",
        data: updatePrice,
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
        iceWaterLabour: setIceWaterLabour,
        dripEdgeLabour: setDripEdgeLabour,
        ventLabour: setVentLabour,
        ridgeVentLabour: setRidgeVentLabour,
        plumbingStackMatLabour: setPlumbingStackMatLabour,
        underLaymentLabour: setUnderLaymentLabour,
        chimneyFlashingLabour: setChimneyFlashingLabour,
        wallFlashingLabour: setWallFlashingLabour,
        satelliteLabour: setSatelliteLabour,
        user: id,
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
