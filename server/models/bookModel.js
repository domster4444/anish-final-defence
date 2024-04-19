//? types import

const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School", // Refers to the 'School' model
      required: [true, "Please add a school"],
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      // required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: String,
    },
    publisher: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    language: {
      type: String,
      required: true,
    },
    noOfPages: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },

    edition: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },

    price: {
      type: String,
    },

    copies: {
      type: Number,
      required: true,
    },

    // "checked out", "on hold", "reserved", "lost", "damaged", "reference only", "restricted access", "unavailable"

    checkedOut: {
      type: Number,
      default: "0",
    },
    onHold: {
      type: Number,
      default: "0",
    },
    reserved: {
      type: Number,
      default: "0",
    },
    lost: {
      type: Number,
      default: "0",
    },
    damaged: {
      type: Number,
      default: "0",
    },
    referenceOnly: {
      type: Number,
      default: "0",
    },
    restrictedAccess: {
      type: Number,
      default: "0",
    },
    unavailable: {
      type: Number,
      default: "0",
    },
  },
  { timestamps: true } //? if something happens in this user model, then timestamp will be created for that. ie. createdAt, updatedAt field will be created automatically
);

const Book = mongoose.model("SchoolBook", bookSchema);

module.exports = Book;
