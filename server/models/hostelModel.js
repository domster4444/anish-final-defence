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
      required: [true, "Please add a hostel name"],
    },
    hostelType: {
      type: String,
      required: [true, "Please add a hostel type"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    intakeCapacity: {
      type: String,
      required: [true, "Please add an intake"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Hostel = mongoose.model("Hostel", hostelRoomTypeSchema);

module.exports = Hostel;
