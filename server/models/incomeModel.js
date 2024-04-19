const mongoose = require("mongoose");
const incomeSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    incomeHead: {
      type: String,
      required: [true, "Please add a incomeHead"],
    },
    name: {
      type: String,
      required: [true, "Please add a  name"],
    },
    invoiceNumber: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
    amount: {
      type: Number,
      required: [true, "Please add a amount"],
    },
    attachedDocumentName: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
