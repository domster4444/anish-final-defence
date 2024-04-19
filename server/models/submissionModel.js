const mongoose = require("mongoose");
const submissionSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: [true, "Please add a school"],
    },
    attachments: [{
        file_name: String,
        file_path: String,
    }],
    assignment: {
        type: String,
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolUser",
    },
    grade: {
        type: String,
        default: "Not graded"
    },
    remarks: {
        type: String,
        default: "No remarks"
    }
},
    { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;