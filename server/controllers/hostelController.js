const Hostel = require("../models/hostelModel.js");
const HostelRoomModel = require("../models/hostelRoomModel");
const hostelStudentModel = require("../models/hostelStudentModel");
const hostelStudentFeesModel = require("../models/hostelStudentFeesModel");
const School = require("../models/schoolModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");
const User = require("../models/userModel");

//TODO: CREATE Hostel Room Type
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

    const newHostelRoom = new Hostel(dataToSave);

    const isDuplication = await Hostel.findOne({ school: School_Id, name: req.body.name }).exec();
    if (isDuplication) {
      return next(new ErrorHandler("record already exists", 400));
    }

    await newHostelRoom.save();

    res.status(201).json({
      success: true,
      message: "record created successfully",
      data: newHostelRoom,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Error creating record", 400));
  }
});

//TODO: GET ALL Hostel Room Type FOR A SCHOOL
exports.getAllRecordForSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const data = await Hostel.find({ school: School_Id }).populate("school").exec();

  if (!data) {
    return next(new ErrorHandler("No records were found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Record Fetched successfully",
    data: data,
  });
});

//TODO: GET SINGLE Hostel Room type detail
exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await Hostel.findById(id)
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

//TODO: UPDATE Hostel Room Type
exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const ExistingHostel = await Hostel.findById(id).exec();

    if (!ExistingHostel) {
      return next(new ErrorHandler(" record not found .", 404));
    }

    ExistingHostel.set(updateData);

    await ExistingHostel.save();

    return res.status(200).json({
      success: true,
      message: "record has been updated successfully!",
      data: ExistingHostel,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

//TODO: DELETE A Hostel Room Type
exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const ExistingHostel = await Hostel.findById(id).exec();

    if (!ExistingHostel) {
      return next(new ErrorHandler("record not found", 404));
    }

    await ExistingHostel.remove();

    return res.status(200).json({
      success: true,
      message: "record has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: GET ALL Hostel Room Type
exports.getAllRecord = catchAsyncErrors(async (req, res, next) => {
  try {
    const HostelRoom = await Hostel.find({}).populate("school").exec();

    if (!HostelRoom) {
      return next(new ErrorHandler("No Class found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: HostelRoom,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// get stats for hostel like:-
// total hostel
// total hostel room
// total hostel students

// todays revenue
// monthly revenue
// yearly revenue
// available hostel rooms
// occupied room count
// hostel employee count
exports.getStats = catchAsyncErrors(async (req, res, next) => {
  // get hostelId from params
  const { hostelId } = req.params;
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS
  let stats = {};
  try {
    // get total hostel count
    const allHostel = await Hostel.find({ school: School_Id }).exec();
    stats.totalHostel = allHostel.length;

    //get total hostel room count for given hostelId
    const allHostelRoomForSpecificHostel = await HostelRoomModel.find({ hostel: hostelId }).exec();
    stats.totalHostelRoom = allHostelRoomForSpecificHostel.length;

    // total hostel student count from  hostelStudentModel
    const allHostelStudent = await hostelStudentModel.find({ hostel: hostelId }).populate("student").exec();
    stats.totalHostelStudent = allHostelStudent.length;

    // from hostelStudentFeesModel get amount earned today , the field name is amount for each record
    let totalAmountEarnedToday = 0;
    const todaysDate = new Date();
    const todaysRevenue = await hostelStudentFeesModel.find({ hostel: hostelId, createdAt: { $gte: new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate()) } }).exec();
    todaysRevenue.forEach((item) => {
      totalAmountEarnedToday += item.amount;
    });
    stats.totalAmountEarnedToday = totalAmountEarnedToday;

    // from hostelStudentFeesModel get amount earned this month , the field name is amount
    let totalAmountEarnedThisMonth = 0;
    const thisMonthRevenue = await hostelStudentFeesModel.find({ hostel: hostelId, createdAt: { $gte: new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1) } }).exec();
    thisMonthRevenue.forEach((item) => {
      totalAmountEarnedThisMonth += item.amount;
    });
    stats.totalAmountEarnedThisMonth = totalAmountEarnedThisMonth;

    // from hostelStudentFeesModel get yearly revenue , the field name is amount for each record
    let totalAmountEarnedThisYear = 0;
    const thisYearRevenue = await hostelStudentFeesModel.find({ hostel: hostelId, createdAt: { $gte: new Date(todaysDate.getFullYear(), 0, 1) } }).exec();
    thisYearRevenue.forEach((item) => {
      totalAmountEarnedThisYear += item.amount;
    });
    stats.totalAmountEarnedThisYear = totalAmountEarnedThisYear;

    // get available hostel rooms count
    const hostelRoomWithHostelId = await HostelRoomModel.find({ hostel: hostelId }).exec();
    // iterate through each and every room and add up noOfBeds-occupiedBed
    let availableBedCount = 0;
    hostelRoomWithHostelId.forEach((room) => {
      availableBedCount += room.noOfBeds - room.occupiedBed;
    });
    stats.availableBedCount = availableBedCount;

    // get occupied hostel rooms count
    let occupiedBedCount = 0;
    hostelRoomWithHostelId.forEach((room) => {
      occupiedBedCount += room.occupiedBed;
    });
    stats.occupiedBed = occupiedBedCount;

    // get hostel employee count
    const hostelEmployee = await User.find({ school: School_Id, role: "hosteler" }).exec();
    stats.hostelEmployee = hostelEmployee.length;

    // gender ration male/female/other in hostelStudent and return obj with below properties
    let male = 0;
    let female = 0;
    let other = 0;
    allHostelStudent.forEach((item) => {
      if (item.student.gender === "male") {
        male++;
      } else if (item.student.gender === "female") {
        female++;
      } else {
        other++;
      }
    });

    stats.pieChart = {
      labels: ["male", "female", "other"],
      data: [male, female, other],
      color: ["rgba(255, 99, 132)", "rgba(54, 162, 235)", "rgba(255, 206, 86)"],
    };

    // line chart logic starts here
    let labels = [];
    let data = [];
    allHostelStudent.forEach((item) => {
      const isPresent = labels.includes(item.student.currentClass);
      if (!isPresent) {
        labels.push(item.student.currentClass);
      }
    });
    labels.forEach((item) => {
      let count = 0;
      allHostelStudent.forEach((student) => {
        if (item === student.student.currentClass) {
          count++;
        }
      });
      data.push(count);
    });
    stats.lineChartData = {
      labels: labels,
      data: {
        label: "Class",
        data: data,
        backgroundColor: "rgba(54, 162, 235)",
        barPercentage: 0.6, // Adjust this value to change the width of the bars
        categoryPercentage: 1, // Ensures bars are evenly spaced
        borderRadius: 10, // Sets the border radius for the bars
      },
    };

    console.log("---------------stats---------------starts");
    console.log(stats);
    console.log("---------------stats---------------ends");

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: stats,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});
