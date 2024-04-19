//? types import

const mongoose = require("mongoose");
const gallerySchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    image: {
      type: String,
      required: true,
    },
    imageCategory: {
      type: String,
    },
  },
  { timestamps: true } //? if something happens in this user model, then timestamp will be created for that. ie. createdAt, updatedAt field will be created automatically
);

const Gallery = mongoose.model("SchoolGallery", gallerySchema);

module.exports = Gallery;
