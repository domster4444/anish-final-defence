const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    attachment: {
      type: String,
    },

    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("BlogPost", postSchema);

module.exports = Post;
