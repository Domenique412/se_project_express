const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ['hot', 'warm', 'cold'],
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
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("clothingItem", clothingItemsSchema);
