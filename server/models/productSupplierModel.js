const mongoose = require("mongoose");
const productSupplierSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    contactPersonName: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    contactPersonPhone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    contactPersonEmail: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductSupplier = mongoose.model("ProductSupplier", productSupplierSchema);

module.exports = ProductSupplier;
