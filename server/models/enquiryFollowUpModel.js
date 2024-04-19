const mongoose = require("mongoose");
const enquiryFollowUpSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },

    enquiry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdmissionEnquiry",
      required: [true, "Please add a associated admission enquiry id"],
    },

    dateFollowUpWasTaken: {
      type: Date,
      default: Date.now,
    },
    followUpTopic: {
      type: String,
      required: [true, "Please add a follow up topic"],
    },

    nextFollowUpDate: {
      type: Date,
    },

    followUpNote: {
      type: String,
      required: [true, "Please add a follow up note"],
    },
  },
  { timestamps: true }
);

const EnquiryFollowUp = mongoose.model("EnquiryFollowUp", enquiryFollowUpSchema);

module.exports = EnquiryFollowUp;
