exports.getPrice = (req, res) => {
  let jsonData = require("./Data.json");
  res.send(jsonData);
};
