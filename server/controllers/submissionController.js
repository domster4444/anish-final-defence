const Submissions = require("../models/submissionModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
// for s3 files
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY
    },
    region: process.env.REGION
});

//make a submission
exports.submitAssignment = catchAsyncErrors(async (req, res, next) => {
    const { assignmentId } = req.params;
    const { student } = req.body;

    const submit = new Submissions({
        school: req.headers["x-school-id"],
        student: student,
        assignment: assignmentId,
        attachments: [{ file_name: "test.pdf", file_path: "C://fakepath/test.pdf" }]
    });
    await submit.save();

    const uploadPromises = req.files.map((file) => {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `submissions/${assignmentId + "_" + Date.now() + "_" + file.originalname}`, //assignmentid_timestamp_filename.ext
            Body: file.buffer
        };
        return s3.upload(params).promise();
    });

    const result = await Promise.all(uploadPromises);

    let attachmentsArray = [];
    result.map(fileResult => {
        attachmentsArray.push({
            "file_name": fileResult.key,
            "file_path": fileResult.Location
        });
    });

    await Submissions.findByIdAndUpdate(
        submit._id, {
        attachments: attachmentsArray
    });

    if (!result) {
        return next(new ErrorHandler("Failed to add file.", 404));
    }

    if (!submit) {
        return next(new ErrorHandler("Failed to submit assignment.", 404));
    }
    res.status(201).json({
        success: true,
        message: "Assignment submitted successfully.",
        data: submit
    });
});

//submitted assignment count
exports.submittedAssignmentsCount = catchAsyncErrors(async (req, res, next) => {
    const { studentId } = req.params;

    const submittedAssignmentsCount = await Submissions.find({ school: req.headers["x-school-id"], student: studentId }).count();

    res.status(200).json({
        success: true,
        message: "Count fetched successfully.",
        data: submittedAssignmentsCount
    });
})

//get all submitted assignments by assignmnet id
exports.viewSubmittedAssignments = catchAsyncErrors(async (req, res, next) => {
    const { assignmentId } = req.params;

    const submittedAssignments = await Submissions.find({ school: req.headers["x-school-id"], assignment: assignmentId }).populate("student").sort({ "updatedAt": -1 }).exec();

    if (!submittedAssignments) {
        return next(new ErrorHandler("Assignments not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Assignments fetched successfully.",
        data: submittedAssignments
    });
});

//delete submission
exports.deleteSubmission = catchAsyncErrors(async (req, res, next) => {
    const { submissionId } = req.params;

    const submission = await Submissions.findByIdAndDelete(submissionId);

    if (!submission) {
        return next(new ErrorHandler("Assignments not found", 404));
    }

    submission.attachments.forEach(file => {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${file.file_name}`,
        };
        return s3.deleteObject(params).promise();
    });

    res.status(200).json({
        success: true,
        message: "Assignment deleted successfully.",
        data: submission
    });
});

//update grade -- by teacher
exports.updateGrade = catchAsyncErrors(async (req, res, next) => {
    const { submissionId } = req.params;
    const { grade } = req.body;

    const submission = await Submissions.findByIdAndUpdate(submissionId, { grade: grade });
    submission.save();

    if (!submission) {
        return next(new ErrorHandler("Assignment not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Grade updated successfully",
        data: submission
    });
});

//update remarks -- by teacher
exports.updateRemark = catchAsyncErrors(async (req, res, next) => {
    const { submissionId } = req.params;
    const { remarks } = req.body;
    console.log(req.body);

    const submission = await Submissions.findByIdAndUpdate(submissionId, { remarks: remarks });

    if (!submission) {
        return next(new ErrorHandler("Assignment not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Reamark updated successfully",
        data: submission
    });
});