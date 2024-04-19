//? types import

const mongoose = require("mongoose");

const canteenItemSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    coverImage: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [50, "Name can not be more than 50 characters"],
      minlength: [3, "Name must be at least 3 characters"],
      required: [true, "Please add a name"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
  },
  { timestamps: true }
);

const CanteenItem = mongoose.model("CanteenItem", canteenItemSchema);

module.exports = CanteenItem;
