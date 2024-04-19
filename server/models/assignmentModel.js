const mongoose = require("mongoose");
const assignmentSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: [true, "Please add a schoool"]
    },
    subject: {
        type: String,
        required: true
    },
    classNumber: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    deadline_date: {
        type: String,
        required: true
    },
    deadline_time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attachments: [{
        file_name: String,
        file_path: String,
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
