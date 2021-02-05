exports.getPrice = (req, res) => {
  let jsonData = require("./Data.json");
  res.send(jsonData);
};

exports.updatePrice = (req, res) => {
  const fs = require("fs");
  const path = require("path");

  let prices = {
    bundle: parseFloat(req.body.bundle),
    starterBundle: parseFloat(req.body.starterBundle),
    cappingBundle: parseFloat(req.body.cappingBundle),
    roofTopCost: parseFloat(req.body.roofTopCost),
    binCost: parseFloat(req.body.binCost),
  };

  fs.writeFileSync(
    path.resolve(__dirname, "Data.json"),
    JSON.stringify(prices)
  );

  res.send("Success");
};
