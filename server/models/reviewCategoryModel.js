const mongoose = require("mongoose");
const reviewCategorySchema = new mongoose.Schema(
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

const ReviewCategory = mongoose.model("ReviewCategory", reviewCategorySchema);

module.exports = ReviewCategory;
