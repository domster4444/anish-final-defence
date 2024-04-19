const Class = require("../models/classModel");
const School = require("../models/schoolModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler.js");

//TODO: CREATE CLASS
exports.createClass = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS
  const { name, roomNumber, maxCapacity, sectionIdsArray } = req.body;
  const sectionsThatTheClassHave = JSON.parse(req.body.sectionIdsArray);

  try {
    if (!School_Id) {
      return next(new ErrorHandler("School ID is required", 400));
    }

    const schoolData = await School.findById({ _id: School_Id }).exec();
    console.log(schoolData);
    if (!schoolData) {
      return next(new ErrorHandler("School not found", 404));
    }

    const newClassData = {
      school: School_Id,
      name,
      roomNumber,
      maxCapacity,
      sections: sectionsThatTheClassHave,
    };

    const newClass = new Class(newClassData);

    const isClassExist = await Class.findOne({ school: School_Id, name }).exec();
    if (isClassExist) {
      return next(new ErrorHandler("Class already exists", 400));
    }

    await newClass.save();

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    return next(new ErrorHandler("Error creating class", 400));
  }
});

//TODO: GET ALL CLASS FOR A SCHOOL
exports.getAllClassForSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const SchoolClass = await Class.find({ school: School_Id }).populate("school").populate("classTeacher").populate("sections").exec();

  if (!SchoolClass) {
    return next(new ErrorHandler("No Class found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Classes fetched successfully",
    data: SchoolClass,
  });
});

//TODO: GET SINGLE CLASS
exports.getSingleClass = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await Class.findById(id)
    .populate("school")
    .exec((error, data) => {
      if (error) {
        return next(new ErrorHandler("Server error", 500));
      }
      if (!data) {
        return next(new ErrorHandler("Class not found", 404));
      }
      return res.status(200).json({
        success: true,
        message: "Book data fetched successfully",
        data: data,
      });
    });
});

//TODO: UPDATE CLASS
exports.updateClass = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log(id);
  console.log(updateData);

  try {
    const SchoolClass = await Class.findById(id).exec();

    if (!SchoolClass) {
      return next(new ErrorHandler("Class not found.", 404));
    }

    SchoolClass.set(updateData);

    await SchoolClass.save();

    return res.status(200).json({
      success: true,
      message: "Class has been updated successfully!",
      data: SchoolClass,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

//TODO: DELETE A CLASS
exports.deleteClass = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const schoolClass = await Class.findById(id).exec();

    if (!schoolClass) {
      return next(new ErrorHandler("Class not found", 404));
    }

    await schoolClass.remove();

    return res.status(200).json({
      success: true,
      message: "Class has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: GET ALL CLASS
exports.getAllClass = catchAsyncErrors(async (req, res, next) => {
  try {
    const schoolClass = await Class.find({}).populate("school").exec();

    if (!schoolClass) {
      return next(new ErrorHandler("No Class found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Class fetched successfully",
      data: schoolClass,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});
