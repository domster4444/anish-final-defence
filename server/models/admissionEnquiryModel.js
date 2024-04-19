const mongoose = require("mongoose");
const admissionEnquirySchema = new mongoose.Schema(
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
      type: Number,
      required: [true, "Please add a phone number"],
    },
    email: {
      type: String,
    },

    address: {
      type: String,
    },

    description: {
      type: String,
    },

    note: {
      type: String,
    },

    date: {
      type: Date,
      required: [true, "Please add a date"],
      default: Date.now,
    },

    nextFollowUpDate: {
      type: Date,
    },

    reference: {
      required: [true, "Please add a reference"],
      type: String,
    },

    source: {
      required: [true, "Please add a source"],
      type: String,
    },

    class: {
      required: [true, "Please add a class"],
      type: String,
    },

    noOfChild: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const AdmissionEnquiry = mongoose.model("AdmissionEnquiry", admissionEnquirySchema);

module.exports = AdmissionEnquiry;
