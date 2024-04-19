const StudentPeriodicAttendance = require("../models/studentPeriodicAttendanceModel");
const School = require("../models/schoolModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");
const { addFile, deleteFile } = require("../utils/fileManipulation.js");

//TODO: CREATE StudentPeriodicAttendance
exports.createRecord = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];
  //! HEADERS

  console.log("==============================");
  console.log(req.body);
  console.log(req.file);
  console.log("==============================");

  try {
    if (!School_Id) {
      return next(new ErrorHandler("School ID is required", 400));
    }

    const schoolData = await School.findById({ _id: School_Id }).exec();
    console.log(schoolData);
    if (!schoolData) {
      return next(new ErrorHandler("School not found", 404));
    }

    let attachedDocumentName = null;
    if (req.file) {
      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.${req.file.originalname.split(".")[1]}`;
      await addFile(School_Folder_Name, fileName, req.file.buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          attachedDocumentName = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
        });
    }

    console.log(req.file);

    const dataToSave = {
      school: School_Id,
      attachedDocumentName: attachedDocumentName,
      ...req.body,
    };

    const newRecord = new StudentPeriodicAttendance(dataToSave);

    const isDuplication = await StudentPeriodicAttendance.findOne({ school: School_Id, attendanceId: req.body.attendanceId }).exec();
    if (isDuplication) {
      return next(new ErrorHandler("Attendance already taken", 400));
    }

    await newRecord.save();

    res.status(201).json({
      success: true,
      message: "Attendance taken successfully",
      data: newRecord,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Error creating record", 400));
  }
});

//TODO: GET ALL StudentPeriodicAttendance FOR A SCHOOL
exports.getAllRecordForSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];
  //! HEADERS
  let data = await StudentPeriodicAttendance.find({ school: School_Id }).populate("school").populate("student").exec();
  data = data.map((item) => {
    return {
      id: item._id,
      school: item._doc.school._id,
      student: item._doc.student ? item._doc.student.name + "(" + item._doc.student.currentRollNo + ")" : "",
      batch: item._doc.studentBatch,
      class: item._doc.currentClass,
      subject: item._doc.currentSubject,
      section: item._doc.currentSection,
      date: item._doc.date,
      status: item._doc.status,
      note: item._doc.note,
    };
  });
  if (!data) {
    return next(new ErrorHandler("No records were found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Record Fetched successfully",
    data,
  });
});

//TODO: GET SINGLE StudentPeriodicAttendance  detail
exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];
  //! HEADERS
  const { id } = req.params;

  await StudentPeriodicAttendance.findById(id)
    .populate("school")
    .exec((error, data) => {
      if (error) {
        return next(new ErrorHandler("error while fetching data", 500));
      }
      if (!data) {
        return next(new ErrorHandler("record not found", 404));
      }
      return res.status(200).json({
        success: true,
        message: "record fetched successfully",
        data: data,
      });
    });
});

//TODO: UPDATE StudentPeriodicAttendance
exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];
  //! HEADERS
  const { id } = req.params;
  const updateData = req.body;
  console.log(updateData);

  try {
    const ExistingRecord = await StudentPeriodicAttendance.findById(id).exec();

    if (!ExistingRecord) {
      return next(new ErrorHandler(" record not found .", 404));
    }

    let attachedDocumentName = ExistingRecord.attachedDocumentName;

    if (req.file) {
      if (attachedDocumentName) {
        await deleteFile(School_Folder_Name, attachedDocumentName)
          .then(() => {
            console.log(`Deleted old file: ${attachedDocumentName}`);
          })
          .catch((error) => {
            console.error(`Error deleting old file: ${error}`);
            return next(new ErrorHandler("Error deleting file", 500));
          });
      }

      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.${req.file.originalname.split(".")[1]}`;
      await addFile(School_Folder_Name, fileName, req.file.buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          attachedDocumentName = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
          return next(new ErrorHandler("Error uploading file", 500));
        });
    }

    ExistingRecord.set(updateData);
    ExistingRecord.attachedDocumentName = attachedDocumentName;

    await ExistingRecord.save();

    return res.status(200).json({
      success: true,
      message: "record has been updated successfully!",
      data: ExistingRecord,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

//TODO: DELETE A StudentPeriodicAttendance
exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];
  //! HEADERS
  const { id } = req.params;
  try {
    const recordToDelete = await StudentPeriodicAttendance.findById(id).exec();

    if (!recordToDelete) {
      return next(new ErrorHandler("record not found", 404));
    }

    let attachedDocumentName = recordToDelete.attachedDocumentName;

    if (attachedDocumentName) {
      await deleteFile(School_Folder_Name, attachedDocumentName)
        .then(() => {
          console.log(`Deleted old file: ${attachedDocumentName}`);
        })
        .catch((error) => {
          console.error(`Error deleting old file: ${error}`);
          return next(new ErrorHandler("Error deleting file", 500));
        });
    }

    await recordToDelete.remove();

    return res.status(200).json({
      success: true,
      message: "record has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: GET ALL StudentPeriodicAttendance
exports.getAllRecord = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];
  //! HEADERS
  try {
    const allRecords = await StudentPeriodicAttendance.find({}).populate("school").exec();

    if (!allRecords) {
      return next(new ErrorHandler("No Class found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: allRecords,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});
