const mongoose = require("mongoose");
const eventCalendarSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    title: {
      type: String,
      required: [true, "Please add a event name"],
    },
    start: {
      type: String,
      required: [true, "Please add a event name"],
    },
    end: {
      type: String,
      required: [true, "Please add a event name"],
    },
    description: {
      type: String,
    },
    scope: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  { timestamps: true }
);

const EventCalendar = mongoose.model("EventCalendar", eventCalendarSchema);

module.exports = EventCalendar;
