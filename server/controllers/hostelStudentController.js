const HostelStudent = require("../models/hostelStudentModel");
const School = require("../models/schoolModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");
const HostelRoom = require("../models/hostelRoomModel.js");

//TODO: CREATE Hostel Student
exports.createRecord = catchAsyncErrors(async (req, res, next) => {
  console.log("req.body in hostelStudentController =", req.body);

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

    const newHostelStudent = new HostelStudent(dataToSave);

    const isDuplication = await HostelStudent.findOne({ school: School_Id, student: req.body.student }).exec();
    if (isDuplication) {
      return next(new ErrorHandler("record already exists", 400));
    }

    await newHostelStudent.save();

    // ! start ========================================also increase occupied bed no in that hostel room
    const hostelRoomId = req.body.hostelRoom;
    const bedOccupied = req.body.bedOccupied;

    // get the hostel room
    await HostelRoom.findById({ _id: hostelRoomId }).exec(async (err, hostelRoom) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("Error occured while saving user to db", 500));
      }
      if (!hostelRoom) {
        return next(new ErrorHandler("Hostel room not found", 404));
      }
      // add occupiedBed to hostelRoom
      hostelRoom.occupiedBed = Number(hostelRoom.occupiedBed) + Number(bedOccupied);

      // just update  with set

      await hostelRoom.save((err, success) => {
        if (err) {
          console.log(err);
          return next(new ErrorHandler("Error occured while saving user to db", 500));
        }
        console.log("HostelRoom updated successfully");
      });
    });
    // ! end ========================================also increase occupied bed no in that hostel room

    res.status(201).json({
      success: true,
      message: "record created successfully",
      data: newHostelStudent,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Error creating record", 400));
  }
});

//TODO: GET ALL Hostel Student  FOR A SCHOOL
exports.getAllRecordForSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const data = await HostelStudent.find({ school: School_Id }).populate("school").populate("student").populate("hostel").populate("hostelRoom").exec();

  if (!data) {
    return next(new ErrorHandler("No records were found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Record Fetched successfully",
    data: data,
  });
});

//TODO: GET SINGLE Hostel Student  detail
exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await HostelStudent.findById(id)
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

//TODO: UPDATE Hostel Student
exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const ExistingHostelStudent = await HostelStudent.findById(id).populate("hostelRoom").exec();

    if (!ExistingHostelStudent) {
      return next(new ErrorHandler(" record not found .", 404));
    }

    // update hostelStudent
    await ExistingHostelStudent.set(updateData);

    await ExistingHostelStudent.save((err, success) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("Error occured while saving user to db", 500));
      }
      console.log("HostelStudent updated successfully");
      return res.status(200).json({
        success: true,
        message: "record has been updated successfully!",
        data: ExistingHostelStudent,
      });
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

//TODO: DELETE A Hostel Student
exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const ExistingHostelStudent = await HostelStudent.findById(id).populate("hostelRoom").exec();

    if (!ExistingHostelStudent) {
      return next(new ErrorHandler("record not found", 404));
    }

    await ExistingHostelStudent.remove();

    // also decrease occupied bed no in that hostel room
    const hostelRoomId = ExistingHostelStudent.hostelRoom._id;
    const bedOccupied = ExistingHostelStudent.bedOccupied;

    const hostelRoom = await HostelRoom.findById({ _id: hostelRoomId }).exec();
    if (!hostelRoom) {
      return next(new ErrorHandler("Hostel room not found", 404));
    }
    // add occupiedBed to hostelRoom
    hostelRoom.occupiedBed = Number(hostelRoom.occupiedBed) - Number(bedOccupied);
    // just update  with set
    await hostelRoom.save((err, success) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("Error occured while saving user to db", 500));
      }
      console.log("HostelRoom updated successfully");
      return res.status(200).json({
        success: true,
        message: "record has been deleted successfully!",
        data: {},
      });
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: GET ALL Hostel Student
exports.getAllRecord = catchAsyncErrors(async (req, res, next) => {
  try {
    const HostelStudent = await HostelStudent.find({}).populate("school").exec();

    if (!HostelStudent) {
      return next(new ErrorHandler("No Class found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: HostelStudent,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});
