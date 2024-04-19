const LibrarySetting = require("../models/librarySettingModel");
const School = require("../models/schoolModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");

//TODO: CREATE RECORD
exports.createRecord = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  try {
    if (!School_Id) {
      return next(new ErrorHandler("School ID is required", 400));
    }

    const schoolData = await School.findById({ _id: School_Id }).exec();
    console.log(schoolData);
    if (!schoolData) {
      return next(new ErrorHandler("School not found", 404));
    }

    // first of all delete all the records for this school
    const deleted = await LibrarySetting.deleteMany({ school: School_Id }).exec();

    if (!deleted) {
      return next(new ErrorHandler("Error deleting record", 400));
    }

    const dataToSave = {
      school: School_Id,
      ...req.body,
    };

    const newRecord = new LibrarySetting(dataToSave);

    await newRecord.save();

    res.status(201).json({
      success: true,
      message: "record created successfully",
      data: newRecord,
    });
  } catch (error) {
    return next(new ErrorHandler("Error creating record", 400));
  }
});

// there will only be one record for each school. make a controller function that returns the 1st record for a school which is obviously the only record for that school.

exports.getRecord = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  if (!School_Id) {
    return next(new ErrorHandler("School ID is required", 400));
  }

  const schoolData = await School.findById({ _id: School_Id }).exec();
  console.log(schoolData);
  if (!schoolData) {
    return next(new ErrorHandler("School not found", 404));
  }

  const record = await LibrarySetting.findOne({ school: School_Id }).exec();
  if (!record) {
    return next(new ErrorHandler("Record not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "record found",
    data: record,
  });
});
