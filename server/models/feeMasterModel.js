const mongoose = require("mongoose");
const feeMasterSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    feeGroup: {
      type: String,
      required: [true, "Please add a fee group"],
    },
    feeType: {
      type: String,
      required: [true, "Please add a fee type"],
    },

    dueDate: {
      type: Date,
    },

    amount: {
      type: Number,
      required: [true, "Please add a amount"],
    },

    fineType: {
      type: String,
      enum: ["none", "fixed", "percentage"],
      default: "none",
    },

    fineAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const FeeMaster = mongoose.model("FeeMaster", feeMasterSchema);

module.exports = FeeMaster;
