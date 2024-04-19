const mongoose = require("mongoose");
const complaintTypeSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a complaint type"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const ComplaintType = mongoose.model("ComplaintType", complaintTypeSchema);

module.exports = ComplaintType;
