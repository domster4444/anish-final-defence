const mongoose = require("mongoose");
const batchSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a batch name"],
    },
  },
  { timestamps: true }
);

const SchoolBatch = mongoose.model("SchoolBatch", batchSchema);

module.exports = SchoolBatch;
