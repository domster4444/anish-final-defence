const mongoose = require("mongoose");
const feeDiscountSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add fee discount name"],
    },
    discountCode: {
      type: String,
      required: [true, "Please add discount code"],
    },

    discountType: {
      type: String,
      enum: ["percentage", "amount"],
      required: [true, "Please add discount type"],
    },

    discountValue: {
      type: Number,
      required: [true, "Please add discount value"],
    },

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const FeeDiscount = mongoose.model("FeeDiscount", feeDiscountSchema);

module.exports = FeeDiscount;
