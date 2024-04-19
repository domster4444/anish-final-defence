const mongoose = require("mongoose");
const employeeDepartmentSchema = new mongoose.Schema(
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

const EmployeeDepartment = mongoose.model("EmployeeDepartment", employeeDepartmentSchema);

module.exports = EmployeeDepartment;
