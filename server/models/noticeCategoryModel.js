//? types import

const mongoose = require("mongoose");
const noticeCategorySchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: [true, "Please add a school"],
    },
    categoryName: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

const NoticeCategory = mongoose.model("NoticeCategory", noticeCategorySchema);

module.exports = NoticeCategory;