const Assignments = require("../models/assignmentModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
// for s3 files
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const Submissions = require("../models/submissionModel");
const ClassTimeTable = require("../models/classTimeTableModel");

//add new assignment --need to add subject according to teacher
exports.createAssignment = catchAsyncErrors(async (req, res, next) => {
  const { title, deadline_date, deadline_time, description, createdBy, classNumber, subject } = req.body;

  const newAssignment = new Assignments({
    title: title,
    description: description,
    createdBy: createdBy,
    deadline_date: deadline_date,
    deadline_time: deadline_time,
    school: req.headers["x-school-id"],
    subject: subject,
    classNumber: classNumber,
  });
  await newAssignment.save();

  if (!newAssignment) {
    return next(new ErrorHandler("Failed to add assignment.", 404));
  }
  const uploadPromises = req.files.map((file) => {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `assignments/${newAssignment._id + "_" + Date.now() + "_" + file.originalname}`, //assignmentid_timestamp_filename.ext
      Body: file.buffer,
    };
    return s3.upload(params).promise();
  });

  const result = await Promise.all(uploadPromises);

  let attachmentsArray = [];
  result.map((fileResult) => {
    attachmentsArray.push({
      file_name: fileResult.key,
      file_path: fileResult.Location,
    });
  });

  await Assignments.findByIdAndUpdate(newAssignment._id, {
    attachments: attachmentsArray,
  });

  if (!result) {
    return next(new ErrorHandler("Failed to add file.", 404));
  }
  if (!newAssignment) {
    return next(new ErrorHandler("Failed to add assignment.", 404));
  }

  res.status(201).json({
    success: true,
    message: "New assignment added successfully.",
    data: newAssignment,
  });
});

//view all Assignments
exports.getAllAssignments = catchAsyncErrors(async (req, res, next) => {
  const allAssignments = await Assignments.find({
    school: req.headers["x-school-id"],
  }).sort({ updatedAt: -1 });

  if (!allAssignments) {
    return next(new ErrorHandler("Failed to fetch Assignment.", 404));
  }

  res.status(200).json({
    success: true,
    message: "All assignments read successfully.",
    data: allAssignments,
  });
});

//delete assignment
exports.deleteAssignment = catchAsyncErrors(async (req, res, next) => {
  const { assignmentId } = req.params;
  const assignment = await Assignments.findByIdAndDelete(assignmentId);

  if (!assignment) {
    return next(new ErrorHandler("Assignment not found."), 404);
  }

  assignment.attachments.forEach((file) => {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${file.file_name}`,
    };
    return s3.deleteObject(params).promise();
  });

  const submissions = await Submissions.find({ assignment: assignmentId });

  submissions.map((submission) => {
    submission.attachments.forEach((file) => {
      console.log(file.file_name);
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${file.file_name}`,
      };
      return s3.deleteObject(params).promise();
    });
  });

  res.status(200).json({
    success: true,
    message: "Assignment deleted.",
    data: assignment,
  });
});

//update assignment
exports.updateAssignment = catchAsyncErrors(async (req, res, next) => {
  const { title, deadline_date, deadline_time, description, createdBy, classNumber, subject } = req.body;
  const { assignmentId } = req.params;

  const assignment = await Assignments.findByIdAndUpdate(
    assignmentId,
    {
      title: title,
      deadline_date: deadline_date,
      deadline_time: deadline_time,
      description: description,
      createdBy: createdBy,
      classNumber: classNumber,
      subject: subject,
    },
    { new: true }
  );

  if (!assignment) {
    return next(new ErrorHandler("Assignment not found.", 404));
  }

  res.status(200).json({
    success: true,
    message: "Assignment updated successfully.",
    data: assignment,
  });
});

//view all Assignments created by a teacher
exports.viewTeachersAssignment = catchAsyncErrors(async (req, res, next) => {
  console.log(req.file);

  const { teacherId } = req.params;

  const assignments = await Assignments.find({ createdBy: teacherId }).sort({ updatedAt: -1 });

  if (!assignments) {
    return next(new ErrorHandler("Failed to fetch Assignment.", 404));
  }

  res.status(200).json({
    success: true,
    message: "Assignments read successfully.",
    data: assignments,
  });
});

//view Assignments of enrolled subjects only - for students --working
exports.viewStudentsAssignment = catchAsyncErrors(async (req, res, next) => {
  const { classId } = req.params;

  const classDetails = await ClassTimeTable.findOne({ class: classId });

  const assignments = await Assignments.find({
    school: req.headers["x-school-id"],
    classNumber: classDetails.name,
  }).sort({ updatedAt: -1 });

  if (!assignments) {
    return next(new ErrorHandler("Failed to fetch Assignment.", 404));
  }

  res.status(200).json({
    success: true,
    message: "Assignments read successfully.",
    data: assignments,
  });
});

//s3 file uplaod
const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
  region: process.env.REGION,
});

const uploadWithMulter = () =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldname: file.path });
      },
      key: function (req, file, cb) {
        cb(null, file.name + new Date());
      },
    }),
  }).array("s3Files", 5); //max number of files allowed

exports.uploadToAws = catchAsyncErrors((req, res, next) => {
  const upload = uploadWithMulter();

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler("Error occured while uploading files.", 404));
    }
    res.status(200).json({
      success: true,
      message: "Assignments added successfully.",
      data: req.body,
    });
  });
});
