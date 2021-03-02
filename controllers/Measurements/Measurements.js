const User = require("../../models/User");
const RoofMeasure = require("../../models/RoofMeasure");
const EaveMeasure = require("../../models/EaveMeasure");
const ErrorResponse = require("../../Utils/ErrorResponse");

exports.addRoofMeasure = async (req, res, next) => {
  const { id, email, passToken, items, eaveItems } = req.body;

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

    const findRoofMeasure = await RoofMeasure.find({ customer: id });
    const findEaveMeasure = await EaveMeasure.find({ customer: id });

    if (findRoofMeasure.length !== 0) {
      for (var i = 0; i < findRoofMeasure.length; i++) {
        //console.log(findRoofMeasure[i]._id);
        const deleteRoofMeasure = await RoofMeasure.findByIdAndDelete(
          findRoofMeasure[i]._id
        );
      }

      if (findEaveMeasure.length !== 0) {
        for (var i = 0; i < findEaveMeasure.length; i++) {
          //console.log(findRoofMeasure[i]._id);
          const deleteRoofMeasure = await EaveMeasure.findByIdAndDelete(
            findEaveMeasure[i]._id
          );
        }
      }

      for (var i = 0; i < items.length; i++) {
        const roofmeasure = await RoofMeasure.create({
          bin: checkValue(items[i].bin),
          chimney: checkValue(items[i].chimney),
          chimneyInc: checkValue(items[i].chimneyInc),
          eave: checkValue(items[i].eave),
          eaveInc: checkValue(items[i].eaveInc),
          gableGrnd: checkValue(items[i].gableGrnd),
          gableGrndInc: checkValue(items[i].gableGrndInc),
          hipRM: checkValue(items[i].hipRM),
          hipRMInc: checkValue(items[i].hipRMInc),
          measureType: checkValue(items[i].measureType),
          newConst: checkValue(items[i].binewConstn),
          pitch: checkValue(items[i].pitch),
          ridge: checkValue(items[i].ridge),
          ridgeInc: checkValue(items[i].ridgeInc),
          roofTop: checkValue(items[i].roofTop),
          stories: checkValue(items[i].stories),
          totalSqFt: checkValue(items[i].totalSqFt),
          valleyRM: checkValue(items[i].valleyRM),
          valleyRMInc: checkValue(items[i].valleyRMInc),
          wall: checkValue(items[i].wall),
          wallInc: checkValue(items[i].wallInc),
          customer: id,
        });

        roofmeasure.save();
      }

      if (eaveItems.length > 0) {
        for (var i = 0; i < eaveItems.length; i++) {
          const eavemeasure = await EaveMeasure.create({
            adjOneStory: checkValue(eaveItems[i].adjOneStory),
            adjOneStoryInc: checkValue(eaveItems[i].adjOneStoryInc),
            adjOneStoryPrice: checkValue(eaveItems[i].adjOneStoryPrice),
            adjTwoStory: checkValue(eaveItems[i].adjTwoStory),
            adjTwoStoryInc: checkValue(eaveItems[i].adjTwoStoryInc),
            adjTwoStoryPrice: checkValue(eaveItems[i].adjTwoStoryPrice),
            corners: checkValue(eaveItems[i].corners),
            cornersPrice: checkValue(eaveItems[i].cornersPrice),
            difficultyPrice: checkValue(eaveItems[i].difficultyPrice),
            elbows: checkValue(eaveItems[i].elbows),
            extraExtensions: checkValue(eaveItems[i].extraExtensions),
            extraExtensionsPrice: checkValue(eaveItems[i].extraExtensionsPrice),
            oneStoryDown: checkValue(eaveItems[i].oneStoryDown),
            oneStoryDownPrice: checkValue(eaveItems[i].oneStoryDownPrice),
            oneStoryEaves: checkValue(eaveItems[i].oneStoryEaves),
            oneStoryPrice: checkValue(eaveItems[i].oneStoryPrice),
            twoStoryDown: checkValue(eaveItems[i].twoStoryDown),
            twoStoryDownPrice: checkValue(eaveItems[i].twoStoryDownPrice),
            twoStoryPrice: checkValue(eaveItems[i].twoStoryPrice),
            customer: id,
          });

          eavemeasure.save();
        }
      }
    } else {
      for (var i = 0; i < items.length; i++) {
        const roofmeasure = await RoofMeasure.create({
          bin: checkValue(items[i].bin),
          chimney: checkValue(items[i].chimney),
          chimneyInc: checkValue(items[i].chimneyInc),
          eave: checkValue(items[i].eave),
          eaveInc: checkValue(items[i].eaveInc),
          gableGrnd: checkValue(items[i].gableGrnd),
          gableGrndInc: checkValue(items[i].gableGrndInc),
          hipRM: checkValue(items[i].hipRM),
          hipRMInc: checkValue(items[i].hipRMInc),
          measureType: checkValue(items[i].measureType),
          newConst: checkValue(items[i].binewConstn),
          pitch: checkValue(items[i].pitch),
          ridge: checkValue(items[i].ridge),
          ridgeInc: checkValue(items[i].ridgeInc),
          roofTop: checkValue(items[i].roofTop),
          stories: checkValue(items[i].stories),
          totalSqFt: checkValue(items[i].totalSqFt),
          valleyRM: checkValue(items[i].valleyRM),
          valleyRMInc: checkValue(items[i].valleyRMInc),
          wall: checkValue(items[i].wall),
          wallInc: checkValue(items[i].wallInc),
          customer: id,
        });

        roofmeasure.save();
      }

      if (eaveItems.length > 0) {
        for (var i = 0; i < eaveItems.length; i++) {
          const eavemeasure = await EaveMeasure.create({
            adjOneStory: checkValue(eaveItems[i].adjOneStory),
            adjOneStoryInc: checkValue(eaveItems[i].adjOneStoryInc),
            adjOneStoryPrice: checkValue(eaveItems[i].adjOneStoryPrice),
            adjTwoStory: checkValue(eaveItems[i].adjTwoStory),
            adjTwoStoryInc: checkValue(eaveItems[i].adjTwoStoryInc),
            adjTwoStoryPrice: checkValue(eaveItems[i].adjTwoStoryPrice),
            corners: checkValue(eaveItems[i].corners),
            cornersPrice: checkValue(eaveItems[i].cornersPrice),
            difficultyPrice: checkValue(eaveItems[i].difficultyPrice),
            elbows: checkValue(eaveItems[i].elbows),
            extraExtensions: checkValue(eaveItems[i].extraExtensions),
            extraExtensionsPrice: checkValue(eaveItems[i].extraExtensionsPrice),
            oneStoryDown: checkValue(eaveItems[i].oneStoryDown),
            oneStoryDownPrice: checkValue(eaveItems[i].oneStoryDownPrice),
            oneStoryEaves: checkValue(eaveItems[i].oneStoryEaves),
            oneStoryPrice: checkValue(eaveItems[i].oneStoryPrice),
            twoStoryDown: checkValue(eaveItems[i].twoStoryDown),
            twoStoryDownPrice: checkValue(eaveItems[i].twoStoryDownPrice),
            twoStoryPrice: checkValue(eaveItems[i].twoStoryPrice),
            customer: id,
          });

          eavemeasure.save();
        }
      }
    }

    res.status(200).json({
      Success: "Success",
    });
  } catch (error) {
    return next(new ErrorResponse(error, 401));
  }
};

function checkValue(val) {
  let newVal;
  if (val === "" || val === undefined) {
    newVal = "0";
  } else {
    newVal = val;
  }
  return newVal;
}
