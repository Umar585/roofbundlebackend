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

    let layer;
    if (form.oneLayer_remove === false) {
      layer = "Two layer";
    } else {
      layer = "One layer";
    }

    let delivery;
    if (form.ground_delivery === false) {
      delivery = "Roof top delivery";
    } else {
      delivery = "Ground delivery";
    }

    let bin;
    if (form.roof_bin === false) {
      bin = "Away from roof";
    } else {
      bin = "Near roof";
    }

    let decking;
    if (form.osb_decking === false && form.plywood_decking === false) {
      decking = "Fir decking";
    } else if (form.fir_decking === false && form.plywood_decking === false) {
      decking = "OSB decking";
    } else if (form.osb_decking === false && form.fir_decking === false) {
      decking = "Plywood decking";
    }

    let chimney;
    if (form.metal_chimney === false && form.concrete_chimney === false) {
      chimney = "Brick";
    } else if (
      form.brick_chimney === false &&
      form.concrete_chimney === false
    ) {
      chimney = "Metal";
    } else if (form.metal_chimney === false && form.brick_chimney === false) {
      chimney = "Concrete";
    }

    let install;
    if (form.satellite_reinstall === false) {
      install = "Solar panels";
    } else {
      install = "Satellite dish";
    }

    let warranty;
    if (form.work_warranty === false) {
      warranty = "Registered";
    } else {
      warranty = "Workman ship";
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
        (updateselctions.brand_roof = form.brand_roof),
        (updateselctions.capping_roof = form.capping_roof),
        (updateselctions.chimney_flashing = form.chimney_flashing),
        (updateselctions.color_roof = form.color_roof),
        (updateselctions.convert_BPS = form.convert_BPS),
        (updateselctions.drip_edge_flashing = form.drip_edge_flashing),
        (updateselctions.fourmat_BPS = form.fourmat_BPS),
        (updateselctions.hr_brand = form.hr_brand),
        (updateselctions.hr_shingle = form.hr_shingle),
        (updateselctions.ice_water_brand = form.ice_water_brand),
        (updateselctions.ice_water_protection = form.ice_water_protection),
        (updateselctions.new_ventilation = form.new_ventilation),
        (updateselctions.onemat_BPS = form.onemat_BPS),
        (updateselctions.reSeal_BPS = form.reSeal_BPS),
        (updateselctions.remove_ventilation = form.remove_ventilation),
        (updateselctions.ridge_ventilation = form.ridge_ventilation),
        (updateselctions.shingle_roof = form.shingle_roof),
        (updateselctions.starter_brand = form.starter_brand),
        (updateselctions.starter_shingle = form.starter_shingle),
        (updateselctions.threemat_BPS = form.threemat_BPS),
        (updateselctions.twomat_BPS = form.twomat_BPS),
        (updateselctions.underlay_brand = form.underlay_brand),
        (updateselctions.underlay_protection = form.underlay_protection),
        (updateselctions.valley_flashing = form.valley_flashing),
        (updateselctions.wall_roof_flashing = form.wall_roof_flashing),
        (updateselctions.layer = layer),
        (updateselctions.delivery = delivery),
        (updateselctions.bin = bin),
        (updateselctions.decking = decking),
        (updateselctions.chimney = chimney),
        (updateselctions.install = install),
        (updateselctions.warranty = warranty),
        updateselctions.save();
    } else {
      const selectionsmeasure = await SelectionsMeasure.create({
        Replace_ventilation: form.Replace_ventilation,
        brand_roof: form.brand_roof,
        capping_roof: form.capping_roof,
        chimney_flashing: form.chimney_flashing,
        color_roof: form.color_roof,
        convert_BPS: form.convert_BPS,
        drip_edge_flashing: form.drip_edge_flashing,
        fourmat_BPS: form.fourmat_BPS,
        hr_brand: form.hr_brand,
        hr_shingle: form.hr_shingle,
        ice_water_brand: form.ice_water_brand,
        ice_water_protection: form.ice_water_protection,
        new_ventilation: form.new_ventilation,
        onemat_BPS: form.onemat_BPS,
        reSeal_BPS: form.reSeal_BPS,
        remove_ventilation: form.remove_ventilation,
        ridge_ventilation: form.ridge_ventilation,
        shingle_roof: form.shingle_roof,
        starter_brand: form.starter_brand,
        starter_shingle: form.starter_shingle,
        threemat_BPS: form.threemat_BPS,
        twomat_BPS: form.twomat_BPS,
        underlay_brand: form.underlay_brand,
        underlay_protection: form.underlay_protection,
        valley_flashing: form.valley_flashing,
        wall_roof_flashing: form.wall_roof_flashing,
        layer: layer,
        delivery: delivery,
        bin: bin,
        decking: decking,
        chimney: chimney,
        install: install,
        warranty: warranty,
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

exports.getAllMeasure = async (req, res, next) => {
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

    const findRoofMeasure = await RoofMeasure.find({ customer: id });
    const findEaveMeasure = await EaveMeasure.find({ customer: id });
    const findSelectionMeasure = await SelectionsMeasure.find({ customer: id });

    res.status(200).json({
      Success: "Success",
      roof: findRoofMeasure,
      eave: findEaveMeasure,
      selection: findSelectionMeasure,
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
