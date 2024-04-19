const mongoose = require("mongoose");
const assignIncidentSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolUser",
      required: [true, "Please assign a student"],
    },

    incidentClass: {
      type: String,
      required: [true, "Please add a incidentClass"],
    },
    incidentSection: {
      type: String,
    },
    incidentRollNo: {
      type: String,
    },

    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: [true, "Please select a incident"],
    },
  },
  { timestamps: true }
);

const AssignIncident = mongoose.model("AssignIncident", assignIncidentSchema);

module.exports = AssignIncident;
