const mongoose = require("mongoose");
const userRatingSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviewProduct",
      required: [true, "Please add product"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add User"],
    },
    rate: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserRating = mongoose.model("UserRating", userRatingSchema);

module.exports = UserRating;
