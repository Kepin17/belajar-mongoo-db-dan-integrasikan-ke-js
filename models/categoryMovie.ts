const mongoose = require("mongoose");

const categorySchema = mongoose.model(
  "CategoryMovie",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = mongoose.model("CategoryMovie", categorySchema);
