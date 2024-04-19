const mongoose = require("mongoose");
const complainSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },

    complaintType: {
      type: String,
    },

    source: {
      type: String,
    },

    complainBy: {
      type: String,
      required: [true, "Please add a complainBy"],
    },

    phone: {
      type: Number,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    description: {
      type: String,
    },

    actionTaken: {
      type: String,
    },

    assignedTo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Complain = mongoose.model("Complain", complainSchema);

module.exports = Complain;
