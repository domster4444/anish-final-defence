const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    // Complete
    name: {
      type: String,
    },
    // Complete
    productCategory: {
      type: String,
    },

    // Complete
    description: {
      type: String,
    },

    star: {
      // store array of numbers
      type: [Number],
    },

    // Complete
    attachment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("reviewProduct", productSchema);

module.exports = Product;
