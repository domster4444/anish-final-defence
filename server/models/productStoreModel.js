const mongoose = require("mongoose");
const productStoreSchema = new mongoose.Schema(
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
    storeCode: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductStore = mongoose.model("ProductStore", productStoreSchema);

module.exports = ProductStore;
