const mongoose = require("mongoose");
const productCategorySchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);

module.exports = ProductCategory;
