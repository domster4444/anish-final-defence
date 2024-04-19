const mongoose = require("mongoose");
const visitorBookSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    purpose: {
      type: String,
      required: [true, "Please add purpose of visit"],
    },
    meetingWith: {
      type: String,
    },
    visitorName: {
      type: String,
      required: [true, "Please add visitor name"],
    },

    phone: {
      type: String,
    },

    idCard: {
      type: String,
    },

    noOfPerson: {
      type: Number,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    inTime: {
      type: String,
    },

    outTime: {
      type: String,
    },

    note: {
      type: String,
    },
  },
  { timestamps: true }
);

const VisitorBook = mongoose.model("VisitorBook", visitorBookSchema);

module.exports = VisitorBook;
