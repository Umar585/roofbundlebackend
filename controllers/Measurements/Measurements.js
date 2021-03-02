const User = require("../../models/User");
const RoofMeasure = require("../../models/RoofMeasure");
const EaveMeasure = require("../../models/EaveMeasure");
const SelectionsMeasure = require("../../models/Selections");
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

exports.addSelectionsMeasure = async (req, res, next) => {
  const { id, email, passToken, form } = req.body;

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

    //finding the selections
    const findSelectionsMeasure = await SelectionsMeasure.find({
      customer: id,
    });

    if (findSelectionsMeasure.length === 1) {
      const newID = findSelectionsMeasure[0]._id;
      const updateselctions = await SelectionsMeasure.findByIdAndUpdate({
        _id: newID,
      });
      (updateselctions.Replace_ventilation = form.Replace_ventilation),
        (updateselctions.away_bin = form.away_bin),
        (updateselctions.brand_roof = form.brand_roof),
        (updateselctions.brick_chimney = form.brick_chimney),
        (updateselctions.capping_roof = form.capping_roof),
        (updateselctions.chimney_flashing = form.chimney_flashing),
        (updateselctions.color_roof = form.color_roof),
        (updateselctions.concrete_chimney = form.concrete_chimney),
        (updateselctions.convert_BPS = form.convert_BPS),
        (updateselctions.drip_edge_flashing = form.drip_edge_flashing),
        (updateselctions.fir_decking = form.fir_decking),
        (updateselctions.fourmat_BPS = form.fourmat_BPS),
        (updateselctions.ground_delivery = form.ground_delivery),
        (updateselctions.hr_brand = form.hr_brand),
        (updateselctions.hr_shingle = form.hr_shingle),
        (updateselctions.ice_water_brand = form.ice_water_brand),
        (updateselctions.ice_water_protection = form.ice_water_protection),
        (updateselctions.metal_chimney = form.metal_chimney),
        (updateselctions.new_ventilation = form.new_ventilation),
        (updateselctions.oneLayer_remove = form.oneLayer_remove),
        (updateselctions.onemat_BPS = form.onemat_BPS),
        (updateselctions.osb_decking = form.osb_decking),
        (updateselctions.plywood_decking = form.plywood_decking),
        (updateselctions.reSeal_BPS = form.reSeal_BPS),
        (updateselctions.registered_warranty = form.registered_warranty),
        (updateselctions.remove_ventilation = form.remove_ventilation),
        (updateselctions.ridge_ventilation = form.ridge_ventilation),
        (updateselctions.roof_bin = form.roof_bin),
        (updateselctions.rooftop_delivery = form.rooftop_delivery),
        (updateselctions.satellite_reinstall = form.satellite_reinstall),
        (updateselctions.shingle_roof = form.shingle_roof),
        (updateselctions.solar_reinstall = form.solar_reinstall),
        (updateselctions.starter_brand = form.starter_brand),
        (updateselctions.starter_shingle = form.starter_shingle),
        (updateselctions.threemat_BPS = form.threemat_BPS),
        (updateselctions.twoLayer_remove = form.twoLayer_remove),
        (updateselctions.twomat_BPS = form.twomat_BPS),
        (updateselctions.underlay_brand = form.underlay_brand),
        (updateselctions.underlay_protection = form.underlay_protection),
        (updateselctions.valley_flashing = form.valley_flashing),
        (updateselctions.wall_roof_flashing = form.wall_roof_flashing),
        (updateselctions.work_warranty = form.work_warranty),
        updateselctions.save();
    } else {
      const selectionsmeasure = await SelectionsMeasure.create({
        Replace_ventilation: form.Replace_ventilation,
        away_bin: form.away_bin,
        brand_roof: form.brand_roof,
        brick_chimney: form.brick_chimney,
        capping_roof: form.capping_roof,
        chimney_flashing: form.chimney_flashing,
        color_roof: form.color_roof,
        concrete_chimney: form.concrete_chimney,
        convert_BPS: form.convert_BPS,
        drip_edge_flashing: form.drip_edge_flashing,
        fir_decking: form.fir_decking,
        fourmat_BPS: form.fourmat_BPS,
        ground_delivery: form.ground_delivery,
        hr_brand: form.hr_brand,
        hr_shingle: form.hr_shingle,
        ice_water_brand: form.ice_water_brand,
        ice_water_protection: form.ice_water_protection,
        metal_chimney: form.metal_chimney,
        new_ventilation: form.new_ventilation,
        oneLayer_remove: form.oneLayer_remove,
        onemat_BPS: form.onemat_BPS,
        osb_decking: form.osb_decking,
        plywood_decking: form.plywood_decking,
        reSeal_BPS: form.reSeal_BPS,
        registered_warranty: form.registered_warranty,
        remove_ventilation: form.remove_ventilation,
        ridge_ventilation: form.ridge_ventilation,
        roof_bin: form.roof_bin,
        rooftop_delivery: form.rooftop_delivery,
        satellite_reinstall: form.satellite_reinstall,
        shingle_roof: form.shingle_roof,
        solar_reinstall: form.solar_reinstall,
        starter_brand: form.starter_brand,
        starter_shingle: form.starter_shingle,
        threemat_BPS: form.threemat_BPS,
        twoLayer_remove: form.twoLayer_remove,
        twomat_BPS: form.twomat_BPS,
        underlay_brand: form.underlay_brand,
        underlay_protection: form.underlay_protection,
        valley_flashing: form.valley_flashing,
        wall_roof_flashing: form.wall_roof_flashing,
        work_warranty: form.work_warranty,
        customer: id,
      });
      selectionsmeasure.save();
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
