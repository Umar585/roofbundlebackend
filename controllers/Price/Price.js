const User = require("../../models/User");
const Prices = require("../../models/Materials");
const LabourPrices = require("../../models/Labour");
const Profits = require("../../models/Profits");
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
      groundDropCost: 0,
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

exports.updateMaterialsPrice = async (req, res, next) => {
  const { pricesData, email, passToken } = req.body;

  let setBundle = setData(pricesData.bundle);
  let setStarterBundle = setData(pricesData.starterBundle);
  let setCappingBundle = setData(pricesData.cappingBundle);
  let setRoofTopCost = setData(pricesData.roofTopCost);
  let setGroundDropCost = setData(pricesData.groundDropCost);
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
        (uPrice.groundDropCost = setGroundDropCost),
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
        groundDropCost: setGroundDropCost,
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

exports.getProfitsPrice = async (req, res, next) => {
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

    const price = await Profits.find({
      user: user.id,
    });

    const emptyPrice = {
      pitchTwo: 0,
      pitchTwoFive: 0,
      pitchThree: 0,
      pitchFour: 0,
      pitchFive: 0,
      pitchSix: 0,
      pitchSeven: 0,
      pitchEight: 0,
      pitchNine: 0,
      pitchTen: 0,
      pitchEleven: 0,
      pitchTwelve: 0,
      pitchThirteen: 0,
      pitchFourteen: 0,
      pitchFifteen: 0,
      pitchSixteen: 0,
      pitchSeventeen: 0,
      pitchEighteen: 0,
    };
    let t = [];
    t.push(emptyPrice);
    if (price.length === 0) {
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

exports.updateProfitsPrice = async (req, res, next) => {
  const { pricesData, email, passToken } = req.body;

  let pitchTwo = setData(pricesData.pitchTwo);
  let pitchTwoFive = setData(pricesData.pitchTwoFive);
  let pitchThree = setData(pricesData.pitchThree);
  let pitchFour = setData(pricesData.pitchFour);
  let pitchFive = setData(pricesData.pitchFive);
  let pitchSix = setData(pricesData.pitchSix);
  let pitchSeven = setData(pricesData.pitchSeven);
  let pitchEight = setData(pricesData.pitchEight);
  let pitchNine = setData(pricesData.pitchNine);
  let pitchTen = setData(pricesData.pitchTen);
  let pitchEleven = setData(pricesData.pitchEleven);
  let pitchTwelve = setData(pricesData.pitchTwelve);
  let pitchThirteen = setData(pricesData.pitchThirteen);
  let pitchFourteen = setData(pricesData.pitchFourteen);
  let pitchFifteen = setData(pricesData.pitchFifteen);
  let pitchSixteen = setData(pricesData.pitchSixteen);
  let pitchSeventeen = setData(pricesData.pitchSeventeen);
  let pitchEighteen = setData(pricesData.pitchEighteen);

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

    const findPrice = await Profits.find({ user: user.id });

    //validation
    if (findPrice.length == 1) {
      const uPrice = await Profits.findByIdAndUpdate(findPrice);
      (uPrice.pitchTwo = pitchTwo),
        (uPrice.pitchTwoFive = pitchTwoFive),
        (uPrice.pitchThree = pitchThree),
        (uPrice.pitchFour = pitchFour),
        (uPrice.pitchFive = pitchFive),
        (uPrice.pitchSix = pitchSix),
        (uPrice.pitchSeven = pitchSeven),
        (uPrice.pitchEight = pitchEight),
        (uPrice.pitchNine = pitchNine),
        (uPrice.pitchTen = pitchTen),
        (uPrice.pitchEleven = pitchEleven),
        (uPrice.pitchTwelve = pitchTwelve),
        (uPrice.pitchThirteen = pitchThirteen),
        (uPrice.pitchFourteen = pitchFourteen),
        (uPrice.pitchFifteen = pitchFifteen),
        (uPrice.pitchSixteen = pitchSixteen),
        (uPrice.pitchSeventeen = pitchSeventeen),
        (uPrice.pitchEighteen = pitchEighteen),
        uPrice.save();

      res.status(201).json({
        success: "Price Updated",
        data: uPrice,
      });
    } else {
      const price = await Profits.create({
        pitchTwo: pitchTwo,
        pitchTwoFive: pitchTwoFive,
        pitchThree: pitchThree,
        pitchFour: pitchFour,
        pitchFive: pitchFive,
        pitchSix: pitchSix,
        pitchSeven: pitchSeven,
        pitchEight: pitchEight,
        pitchNine: pitchNine,
        pitchTen: pitchTen,
        pitchEleven: pitchEleven,
        pitchTwelve: pitchTwelve,
        pitchThirteen: pitchThirteen,
        pitchFourteen: pitchFourteen,
        pitchFifteen: pitchFifteen,
        pitchSixteen: pitchSixteen,
        pitchSeventeen: pitchSeventeen,
        pitchEighteen: pitchEighteen,
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
