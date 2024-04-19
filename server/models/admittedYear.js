const mongoose = require("mongoose");
const admittedYearSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a admitted year"],
    },
  },
  { timestamps: true }
);

const SchoolAdmittedYear = mongoose.model("SchoolAdmittedYear", admittedYearSchema);

module.exports = SchoolAdmittedYear;
