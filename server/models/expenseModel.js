const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    expenseHead: {
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

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
