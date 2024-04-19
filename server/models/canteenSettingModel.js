const mongoose = require("mongoose");
const canteenSettingSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },

    canteenStartTime: {
      type: String,
      required: [true, "Please add a Canteen StartTime"],
    },
    canteenEndTime: {
      type: String,
      required: [true, "Please add a Canteen EndTime"],
    },
    canteenOpeningStartDay: {
      type: String,
      required: [true, "Please add a Canteen OpenDays"],
    },
    canteenOpeningEndDay: {
      type: String,
      required: [true, "Please add a Canteen OpenDays"],
    },
    isTakePayment: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const CanteenSetting = mongoose.model("CanteenSetting", canteenSettingSchema);

module.exports = CanteenSetting;
