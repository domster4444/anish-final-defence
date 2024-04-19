const mongoose = require("mongoose");
const hostelRoomSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: [true, "Please add a hostel"],
    },
    occupiedBed: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: [true, "Please add a room number"],
      maxlength: [20, "Room number can not be more than 20 characters"],
    },
    hostelRoomType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HostelRoomType",
      required: [true, "Please add a hostel room type"],
    },
    noOfBeds: {
      type: Number,
      required: [true, "Please add a number of beds"],
    },
    floorName: {
      type: String,
      required: [true, "Please add a floor name"],
    },
    costPerBed: {
      type: String,
      required: [true, "Please add a cost per bed"],
    },
    description: {
      type: String,
      maxlength: [500, "Description can not be more than 500 characters"],
    },
  },
  { timestamps: true }
);

const HostelRoom = mongoose.model("HostelRoom", hostelRoomSchema);

module.exports = HostelRoom;
