const EventCalendarModel = require("../models/eventCalendarModel");
const School = require("../models/schoolModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");
const excelToJson = require("convert-excel-to-json");

//TODO: CREATE Event Calendar
exports.createRecord = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  try {
    if (!School_Id) {
      return next(new ErrorHandler("School ID is required", 400));
    }

    const schoolData = await School.findById({ _id: School_Id }).exec();
    if (!schoolData) {
      return next(new ErrorHandler("School not found", 404));
    }

    const dataToSave = {
      school: School_Id,
      ...req.body,
    };

    const newRecord = new EventCalendarModel(dataToSave);

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

//TODO: GET ALL Event Calendar FOR A SCHOOL
exports.getAllRecordForSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  // find all record with scope = public and also all record with scope = private but with school id
  const data = await EventCalendarModel.find({
    $or: [{ scope: "public" }, { scope: "private", school: School_Id }],
  })
    .populate("school")
    .exec();

  // check today date and give all record starting from past 30 days to future 365 days therefore total fetched record will be 395 documents
  const todayDate = new Date();
  const pastDate = new Date(todayDate.setDate(todayDate.getDate() - 30));
  const futureDate = new Date(todayDate.setDate(todayDate.getDate() + 730));

  // data saved in database is in format of Mon Jan 01   2024 00:00:00 GMT+0545 (Nepal Time) for "start" and "end" field
  // therefore we need to convert it to ISO format to compare with today date
  const pastDateInISOFormat = new Date(pastDate.toISOString());
  const futureDateInISOFormat = new Date(futureDate.toISOString());

  // filter data with date range
  const filteredData = data.filter((element) => {
    const startDate = new Date(element.start);
    const endDate = new Date(element.end);

    if (startDate >= pastDateInISOFormat && endDate <= futureDateInISOFormat) {
      return true;
    }
    return false;
  });

  //  now sort the filtered data with start date
  const sortedData = filteredData.sort((a, b) => {
    const startDateA = new Date(a.start);
    const startDateB = new Date(b.start);

    if (startDateA < startDateB) {
      return -1;
    }
    if (startDateA > startDateB) {
      return 1;
    }
    return 0;
  });

  if (!sortedData) {
    return next(new ErrorHandler("No records were found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Record Fetched successfully",
    data: sortedData,
  });
});

//TODO: GET SINGLE Event Calendar detail
exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await EventCalendarModel.findById(id)
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

//TODO: UPDATE Event Calendar
exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const ExistingRecord = await EventCalendarModel.findById(id).exec();

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

//TODO: DELETE A Event Calendar
exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const recordToDelete = await EventCalendarModel.findById(id).exec();

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

// TODO: GET ALL Event Calendar
exports.getAllRecord = catchAsyncErrors(async (req, res, next) => {
  try {
    const allRecords = await EventCalendarModel.find({}).populate("school").exec();

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

exports.bulkUploadRecord = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  try {
    if (!School_Id) {
      return next(new ErrorHandler("School ID is required", 400));
    }

    const schoolData = await School.findById({ _id: School_Id }).exec();
    if (!schoolData) {
      return next(new ErrorHandler("School not found", 404));
    }

    // Convert Excel to JSON
    const excelJson = excelToJson({
      source: req.file.buffer, // Use the buffer from req.file
      header: {
        rows: 1,
      },
      columnToKey: {
        A: "title",
        B: "start",
        C: "end",
        D: "description",
      },
    });

    // get array of data from the first sheet
    const dataArray = excelJson[Object.keys(excelJson)[0]];

    // add school id to each object of the array of excel
    dataArray.forEach((element) => {
      element.school = School_Id;
    });

    // remove record with no title's string length less than 4
    const arrayOfAllExcelRowsWithNoEmptyTitle = dataArray.filter((element) => {
      if (!element.title) {
        return false;
      }
      if (element.title.length < 4) {
        return false;
      }
      return element.title.length > 4;
    });

    console.log("dataArray", arrayOfAllExcelRowsWithNoEmptyTitle);

    await EventCalendarModel.insertMany(arrayOfAllExcelRowsWithNoEmptyTitle, function (err, docs) {
      if (err) {
        console.log("ERROR is ===", err);
        return next(new ErrorHandler("Error creating record", 400));
      } else {
        return res.status(201).json({
          success: true,
          message: "record created successfully",
          data: docs,
        });
      }
    });
  } catch (error) {
    console.log("ERROR is ===", error);
    res.status(400).json({
      success: false,
      message: "Error creating record",
      data: error,
    });
  }
});
