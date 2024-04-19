//? types import

const mongoose = require("mongoose");
const bookCategorySchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School", // Refers to the 'School' model
      required: [true, "Please add a school"],
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //? if something happens in this user model, then timestamp will be created for that. ie. createdAt, updatedAt field will be created automatically
);

const BookCategory = mongoose.model("SchoolBookCategory", bookCategorySchema);

module.exports = BookCategory;
