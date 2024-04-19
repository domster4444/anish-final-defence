//? types import

const mongoose = require("mongoose");

const postalDispatchSchema = new mongoose.Schema(
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
      required: [true, "Please add to title"],
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const PostalDispatch = mongoose.model("PostalDispatch", postalDispatchSchema);

module.exports = PostalDispatch;
