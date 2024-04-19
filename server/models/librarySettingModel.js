const mongoose = require("mongoose");
const librarySettingSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },

    libraryStartTime: {
      type: String,
      required: [true, "Please add a libraryStartTime"],
    },
    libraryEndTime: {
      type: String,
      required: [true, "Please add a libraryEndTime"],
    },
    libraryOpeningStartDay: {
      type: String,
      required: [true, "Please add a libraryOpenDays"],
    },
    libraryOpeningEndDay: {
      type: String,
      required: [true, "Please add a libraryOpenDays"],
    },
    fineStatus: {
      type: Boolean,
      required: [true, "Please add a fineStatus"],
    },
    fineAmount: {
      type: Number,
      default: 0,
    },
    penaltyRecurrenceInterval: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const LibrarySetting = mongoose.model("LibrarySetting", librarySettingSchema);

module.exports = LibrarySetting;
