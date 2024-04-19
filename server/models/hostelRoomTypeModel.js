const mongoose = require("mongoose");
const hostelRoomTypeSchema = new mongoose.Schema(
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
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const HostelRoomType = mongoose.model("HostelRoomType", hostelRoomTypeSchema);

module.exports = HostelRoomType;
