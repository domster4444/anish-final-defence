const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    photos: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("SchoolEventRecord", eventSchema);

module.exports = Event;
