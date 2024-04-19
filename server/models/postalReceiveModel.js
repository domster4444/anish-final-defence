//? types import

const mongoose = require("mongoose");

const postalReceiveSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    coverImage: {
      type: String,
    },

    fromTitle: {
      type: String,
      required: [true, "Please add from title"],
    },
    referenceNo: {
      type: String,
    },
    address: {
      type: String,
    },
    note: {
      type: String,
    },
    toTitle: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const PostalReceive = mongoose.model("PostalReceive", postalReceiveSchema);

module.exports = PostalReceive;
