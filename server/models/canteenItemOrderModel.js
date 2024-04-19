// orderModel.js

const mongoose = require("mongoose");

const canteenItemOrderSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please provide a school"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolUser",
      required: [true, "Please provide a user"],
    },
    name: {
      type: String,
      required: [true, "Please provide the item name"],
    },
    quantity: {
      type: String,
      required: [true, "Please provide the quantity of the item"],
    },
    totalAmount: {
      type: String,
      required: [true, "Please provide the total amount for the order"],
    },
    status: {
      type: String,
      enum: ["order placed", "processing", "ready", "delivered", "cancelled"],
      default: "order placed",
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const CanteenItemOrder = mongoose.model("CanteenItemOrder", canteenItemOrderSchema);

module.exports = CanteenItemOrder;
