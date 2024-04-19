const mongoose = require("mongoose");
const incomeHeadSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a class name"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const IncomeHead = mongoose.model("IncomeHead", incomeHeadSchema);

module.exports = IncomeHead;
