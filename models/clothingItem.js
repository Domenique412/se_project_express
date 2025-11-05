const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Must be a valid link",
    },
  },
  likes: {
    type: [String], // Array of user IDs as strings
    default: [],
  },
});

module.exports = mongoose.model("clothingItems", clothingItemsSchema);
