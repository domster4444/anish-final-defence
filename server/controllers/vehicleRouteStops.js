const VehicleRouteStops = require("../models/vehicleRouteStopsModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");

// CREATE RECORD
exports.createRecord = catchAsyncErrors(async (req, res, next) => {
  // HEADERS
  const School_Id = req.headers["x-school-id"];
  // HEADERS

  try {
    if (!School_Id) {
      return next(new ErrorHandler("School ID is required", 400));
    }

    // Check if the school exists
    const schoolData = await School.findById({ _id: School_Id }).exec();
    if (!schoolData) {
      return next(new ErrorHandler("School not found", 404));
    }

    // Prepare data to save
    const dataToSave = {
      route: req.body.route,
      schedule: JSON.parse(req.body.schedule), // Assuming schedule is sent as a JSON string
    };

    // Check for duplication
    const isDuplication = await VehicleRouteStops.findOne({ route: req.body.route }).exec();
    if (isDuplication) {
      return next(new ErrorHandler("Record already exists", 400));
    }

    const newRecord = new VehicleRouteStops(dataToSave);

    await newRecord.save();

    res.status(201).json({
      success: true,
      message: "Record created successfully",
      data: newRecord,
    });
  } catch (error) {
    return next(new ErrorHandler("Error creating record", 400));
  }
});

// GET ALL RECORD FOR A SCHOOL
exports.getAllRecordForSchool = catchAsyncErrors(async (req, res, next) => {
  // HEADERS
  const School_Id = req.headers["x-school-id"];
  // HEADERS

  const data = await VehicleRouteStops.find({}).exec();

  if (!data) {
    return next(new ErrorHandler("No records were found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Records fetched successfully",
    data: data,
  });
});

// GET SINGLE RECORD detail
exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await VehicleRouteStops.findById(id).exec((error, data) => {
    if (error) {
      return next(new ErrorHandler("Error while fetching data", 500));
    }
    if (!data) {
      return next(new ErrorHandler("Record not found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: data,
    });
  });
});

// UPDATE RECORD
exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // If 'schedule' is present in the updateData, parse it as JSON
    if (updateData.schedule && typeof updateData.schedule === "string") {
      updateData.schedule = JSON.parse(updateData.schedule);
    }

    const existingRecord = await VehicleRouteStops.findById(id).exec();

    if (!existingRecord) {
      return next(new ErrorHandler("Record not found", 404));
    }

    existingRecord.set(updateData);

    await existingRecord.save();

    return res.status(200).json({
      success: true,
      message: "Record has been updated successfully!",
      data: existingRecord,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// DELETE A RECORD
exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const recordToDelete = await VehicleRouteStops.findById(id).exec();

    if (!recordToDelete) {
      return next(new ErrorHandler("Record not found", 404));
    }

    await recordToDelete.remove();

    return res.status(200).json({
      success: true,
      message: "Record has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// GET ALL RECORD
exports.getAllRecord = catchAsyncErrors(async (req, res, next) => {
  try {
    const allRecords = await VehicleRouteStops.find({}).exec();

    if (!allRecords) {
      return next(new ErrorHandler("No records found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Records fetched successfully",
      data: allRecords,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});
