const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a stream name"],
    },
  },
  { timestamps: true }
);

const Stream = mongoose.model("SchoolStream", streamSchema);

module.exports = Stream;
