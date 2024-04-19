const BookFine = require("../models/bookFineModel");
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

    const dataToSave = {
      school: School_Id,
      ...req.body,
    };

    const newRecord = new BookFine(dataToSave);

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

//TODO: GET ALL RECORD FOR A SCHOOL
exports.getAllRecordForSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const data = await BookFine.find({ school: School_Id }).populate("school").populate("student").exec();

  if (!data) {
    return next(new ErrorHandler("No records were found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Record Fetched successfully",
    data: data,
  });
});

//TODO: GET SINGLE RECORD detail
exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await BookFine.findById(id)
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

//TODO: UPDATE RECORD
exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log(updateData);

  try {
    const ExistingRecord = await BookFine.findById(id).exec();

    if (!ExistingRecord) {
      return next(new ErrorHandler(" record not found .", 404));
    }

    ExistingRecord.set(updateData);

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

//TODO: DELETE A RECORD
exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const recordToDelete = await BookFine.findById(id).exec();

    if (!recordToDelete) {
      return next(new ErrorHandler("record not found", 404));
    }

    await recordToDelete.remove();

    return res.status(200).json({
      success: true,
      message: "record has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: GET ALL RECORD
exports.getAllRecord = catchAsyncErrors(async (req, res, next) => {
  try {
    const allRecords = await BookFine.find({}).populate("school").exec();

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

// TODO: GET ALL RECORD FOR A SCHOOL with FineType lost or damaged or late with :type

exports.getAllRecordForSchoolWithType = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const { type } = req.params;

  const data = await BookFine.find({
    school: School_Id,
    fineType: type,
  })
    .populate("school")
    .populate("student")
    .exec();

  if (!data) {
    return next(new ErrorHandler("No records were found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Record Fetched successfully",
    data: data,
  });
});
