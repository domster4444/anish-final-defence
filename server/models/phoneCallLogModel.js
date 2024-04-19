const mongoose = require("mongoose");
const phoneCallLogSchema = new mongoose.Schema(
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

    phone: {
      type: Number,
      required: [true, "Please add phone number"],
    },

    date: {
      type: Date,
      required: [true, "Please add date"],
      default: Date.now,
    },

    description: {
      type: String,
    },

    nextFollowUpDate: {
      type: Date,
    },

    callDuration: {
      type: Number,
    },

    note: {
      type: String,
    },

    callType: {
      type: String,
      required: [true, "Please add call type"],
      enum: ["incoming", "outgoing"],
      default: "Incoming",
    },
  },
  { timestamps: true }
);

const PhoneCallLog = mongoose.model("PhoneCallLog", phoneCallLogSchema);

module.exports = PhoneCallLog;
