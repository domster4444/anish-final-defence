const VehicleRouteModel = require("../models/vehicleRouteModel.js");
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

    const newRecord = new VehicleRouteModel(dataToSave);

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

  const data = await VehicleRouteModel.find({ school: School_Id }).populate("school").populate("vehicleNumber").exec();

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

  await VehicleRouteModel.findById(id)
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
    const ExistingRecord = await VehicleRouteModel.findById(id).exec();

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
    const recordToDelete = await VehicleRouteModel.findById(id).exec();

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
    const allRecords = await VehicleRouteModel.find({}).populate("school").exec();

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

//  !! CREATING A SEPARATE GET ROUTE FOR SELECT OPTIONS That will return only name and _id
exports.getAllAssociatedVehicleForSpecificRoute = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  const { name } = req.params;

  try {
    const allRecords = await VehicleRouteModel.find({
      school: School_Id,
      name: name,
    })
      .populate("vehicleNumber")
      .exec();

    if (!allRecords) {
      return next(new ErrorHandler("No vehicles for that route is found", 404));
    }

    // convert it to {_id , name} logic is as below
    // let allRecord = data.map((item) => {
    //   return {
    //     name: item.name,
    //     _id: item.name,
    //   };
    // });

    const allVehicleAssociatedToTheRoute = allRecords.map((item) => {
      return {
        name: item.vehicleNumber.name,
        _id: item.vehicleNumber._id,
      };
    });

    console.log(allVehicleAssociatedToTheRoute);

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: allVehicleAssociatedToTheRoute,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});