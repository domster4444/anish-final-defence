const mongoose = require("mongoose");
const liveClassMeetingSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a meeting title"],
    },
    type: {
      enum: ["gmeet", "zoom"],
      type: String,
      required: [true, "Please add a meeting type"],
    },
    meetingDateTime: {
      type: Date,
      required: [true, "Please add a meeting date"],
    },

    class: {
      type: String,
      required: [true, "Please add a class"],
    },
    section: {
      type: String,
      default: "all",
    },
    meetingDuration: {
      type: Number,
      required: [true, "Please add a meeting duration"],
    },

    meetingLink: {
      type: String,
      required: [true, "Please add a meeting link"],
    },
    createdBy: {
      type: String,
      required: [true, "Please add a user who create the meeting"],
    },

    status: {
      type: String,
      enum: ["awaited", "finished", "cancelled", "postponed"],
      default: "awaited",
    },

    staffs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolUser",
      },
    ],

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const LiveClassMeeting = mongoose.model("LiveClassMeeting", liveClassMeetingSchema);

module.exports = LiveClassMeeting;
