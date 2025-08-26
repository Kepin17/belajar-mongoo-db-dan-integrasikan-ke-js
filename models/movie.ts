const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  ages: Number,
  team: [
    {
      name: String,
      role: String,
    },
  ],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "CategoryMovie" },
  isPublished: Boolean,
  rating: Number,
});

module.exports = mongoose.model("Movie", movieSchema);
