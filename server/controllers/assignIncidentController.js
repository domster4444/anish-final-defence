const AssignIncident = require("../models/assignIncidentModel.js");
const School = require("../models/schoolModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");
const User = require("../models/userModel");

//TODO: CREATE RECORD
exports.createRecord = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const { student } = req.body;
  const userDetail = await User.find({ _id: student }).exec();

  req.body.incidentClass = userDetail[0].currentClass;

  if (userDetail[0].currentRollNo.length !== 0) {
    req.body.incidentRollNo = userDetail[0].currentRollNo;
  }

  if (userDetail[0].studentSection.length !== 0) {
    req.body.incidentSection = userDetail[0].studentSection;
  }

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

    const newRecord = new AssignIncident(dataToSave);

    await newRecord.save();

    res.status(201).json({
      success: true,
      message: "record created successfully",
      data: newRecord,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Error creating record", 400));
  }
});

//TODO: GET ALL RECORD FOR A SCHOOL
exports.getAllRecordForSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const data = await AssignIncident.find({ school: School_Id }).populate("school").populate("student").populate("incident").exec();

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

  await AssignIncident.findById(id)
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
    const ExistingRecord = await AssignIncident.findById(id).exec();

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
    const recordToDelete = await AssignIncident.findById(id).exec();

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
    const allRecords = await AssignIncident.find({}).populate("school").exec();

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

// statistic for incident
exports.getIncidentStats = catchAsyncErrors(async (req, res, next) => {
  // get all incident for a school in this year
  const year = new Date().getFullYear();
  const schoolId = req.headers["x-school-id"];
  // use createdAt to compare with year variable

  const totalIncidentThisYear = await AssignIncident.find({ school: schoolId, createdAt: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) } })
    .populate("incident")
    .exec();

  // get all AssignIncident for a school in this month
  const month = new Date().getMonth() + 1;
  const totalIncidentThisMonth = await AssignIncident.find({ school: schoolId, createdAt: { $gte: new Date(`${year}-${month}-01`), $lte: new Date(`${year}-${month}-31`) } })
    .populate("incident")
    .exec();

  // get all negative incident for a school in this year
  const allNegativeIncidentCountThisYear = totalIncidentThisYear.map((item) => {
    if (item.incident.isNegative === "true") {
      return item;
    }
  });

  const allNegativeIncidentCountThisMonth = totalIncidentThisMonth.map((item) => {
    if (item.incident.isNegative === "true") {
      return item;
    }
  });

  const countOfPositiveIncidentThisYear = totalIncidentThisYear.length - allNegativeIncidentCountThisYear.length;
  const countOfPositiveIncidentThisMonth = totalIncidentThisMonth.length - allNegativeIncidentCountThisMonth.length;
  const countOfNegativeIncidentThisYear = allNegativeIncidentCountThisYear.length;
  const countOfNegativeIncidentThisMonth = allNegativeIncidentCountThisMonth.length;
  const totalIncidentThisYearCount = totalIncidentThisYear.length;
  const totalIncidentThisMonthCount = totalIncidentThisMonth.length;

  const data = {
    totalIncidentThisYearCount,
    totalIncidentThisMonthCount,
    countOfPositiveIncidentThisYear,
    countOfPositiveIncidentThisMonth,
    countOfNegativeIncidentThisYear,
    countOfNegativeIncidentThisMonth,
  };

  return res.status(200).json({
    success: true,
    message: "Incident Statistic",
    data,
  });
});
