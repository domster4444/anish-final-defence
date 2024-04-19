const mongoose = require("mongoose");
const employeeDesignationSchema = new mongoose.Schema(
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

const EmployeeDesignation = mongoose.model("EmployeeDesignation", employeeDesignationSchema);

module.exports = EmployeeDesignation;
