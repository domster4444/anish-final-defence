const ClassTimeTable = require("../models/classTimeTableModel");
const School = require("../models/schoolModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");

//TODO: CREATE RECORD
exports.createRecord = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.body.school;

  try {
    if (!School_Id) {
      return next(new ErrorHandler("School ID is required", 400));
    }

    const schoolData = await School.findById({ _id: School_Id }).exec();
    console.log(schoolData);
    if (!schoolData) {
      return next(new ErrorHandler("School not found", 404));
    }

    const newRecord = new ClassTimeTable(req.body);

    console.log("============REQ.BODY IS=========================");
    console.log(req.body);

    // check if record with same name , same school, same day then throw error
    const recordExists = await ClassTimeTable.findOne({
      school: School_Id,
      name: req.body.name,
      day: req.body.day,
    });

    if (recordExists) {
      return next(new ErrorHandler(`Timetable for ${req.body.day} has already been created for ${req.body.name}, delete the timetable or edit instead.`, 400));
    }
    console.log(recordExists);
    console.log("=====================================");

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

// TODO: GET TIME TABLE "NAMES" WITHOUT DUPLICATION
exports.getAllClassTimeTableNames = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  try {
    const allRecords = await ClassTimeTable.find({
      school: School_Id,
    })
      .populate("school")
      .exec();

    if (!allRecords) {
      return next(new ErrorHandler("No Class found", 404));
    }

    let classTimeTableNameList = allRecords.map((item) => item.name);

    // remove duplicate names
    let uniqueClassTimeTableNameList = [...new Set(classTimeTableNameList)];
    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: uniqueClassTimeTableNameList,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

exports.deleteClassTimeTableByName = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const { classTimeTableName } = req.params;

  try {
    const allRecords = await ClassTimeTable.deleteMany({
      school: School_Id,
      name: classTimeTableName,
    });

    if (!allRecords) {
      return next(new ErrorHandler("No Class found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Record deleted successfully",
      data: allRecords,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: using classTeacherId get all subjects taught by the teacher from the classTimeTable model
exports.getSubjectsByClassTeacherId = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const { classTeacherId, classId } = req.params;

  try {
    const allRecords = await ClassTimeTable.find({
      school: School_Id,
      "subjects.teacher": classTeacherId,
      class: classId,
    }).exec();

    if (!allRecords) {
      return next(new ErrorHandler("No Class found", 404));
    }

    let subjectsTaughtByTeacher = [];
    allRecords.forEach((item) => {
      item.subjects.forEach((subject) => {
        if (subject.teacher == classTeacherId) {
          subjectsTaughtByTeacher.push(subject);
        }
      });
    });

    // remove duplicate subjects
    let uniqueSubjectsTaughtByTeacher = [...new Set(subjectsTaughtByTeacher)];

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: uniqueSubjectsTaughtByTeacher,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: using classTeacherId get all class he teaches from the classTimeTable model
exports.getClassesTeacherTeachByTeacherId = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const { classTeacherId } = req.params;

  try {
    const allRecords = await ClassTimeTable.find({
      school: School_Id,
      "subjects.teacher": classTeacherId,
    }).exec();

    if (!allRecords) {
      return next(new ErrorHandler("No Class found", 404));
    }

    // if there is all record then filter out the subjects taught by the teacher, make sure there is no duplicate
    let classesTaughtByTeacher = [];
    allRecords.forEach((item) => {
      classesTaughtByTeacher.push({ classId: item.class, className: item.name });
    });

    // remove duplicate subjects
    let uniqueClassesTaughtByTeacher = [...new Set(classesTaughtByTeacher)];

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: uniqueClassesTaughtByTeacher,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: Using classId and sectionName, get all classTimeTable records from the classTimeTable model
exports.getClassTimeTableByClassIdAndSectionName = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const { classId, sectionName } = req.body;

  let query = sectionName ? { school: School_Id, class: classId, section: sectionName } : { school: School_Id, class: classId };

  try {
    const allRecords = await ClassTimeTable.find(query).populate("class").populate("subjects.teacher").exec();

    if (!allRecords || allRecords.length === 0) {
      // return all data with empty array
      return res.status(200).json({
        success: true,
        message: "Record fetched successfully",
        data: {
          sunday: [],
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
        },
      });
    }

    let format = {};

    // Iterate over each record and organize them by day
    allRecords.forEach((record) => {
      const day = record.day.toLowerCase();

      // If the day doesn't exist in the format object, create an array for it
      if (!format[day]) {
        format[day] = [];
      }

      // Iterate over subjects in the record and push them to the corresponding day
      record.subjects.forEach((subject) => {
        format[day].push({
          subject: subject.subject,
          teacher: subject.teacher.name, // Assuming "name" is the field for the teacher's name
          timeFrom: subject.timeFrom,
          timeTo: subject.timeTo,
          class: record.class.name,
          section: record.section,
        });
      });
    });

    return res.status(200).json(format);
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: using teacherId get timetable for the teacher in format similar to that of getClassTimeTableByClassIdAndSectionName response
exports.getTeacherTimeTableByTeacherId = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const { teacherId } = req.body;

  try {
    const allRecords = await ClassTimeTable.find({
      school: School_Id,
      "subjects.teacher": teacherId,
    })
      .populate("class")
      .populate("subjects.teacher")
      .exec();

    if (!allRecords || allRecords.length === 0) {
      // return all data with empty array
      return res.status(200).json({
        success: true,
        message: "Record fetched successfully",
        data: {
          sunday: [],
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
        },
      });
    }

    let format = {};

    // Iterate over each record and organize them by day
    allRecords.forEach((record) => {
      const day = record.day.toLowerCase();

      // If the day doesn't exist in the format object, create an array for it
      if (!format[day]) {
        format[day] = [];
      }

      // Iterate over subjects in the record and push them to the corresponding day
      record.subjects.forEach((subject) => {
        if (subject.teacher._id == teacherId) {
          format[day].push({
            subject: subject.subject,
            teacher: subject.teacher.name, // Assuming "name" is the field for the teacher's name
            timeFrom: subject.timeFrom,
            timeTo: subject.timeTo,
            class: record.class.name,
            section: record.section,
          });
        }
      });
    });

    return res.status(200).json(format);
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

exports.getAllClassesForDay = catchAsyncErrors(async(req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var d = new Date();
  var dayName = days[d.getDay()];

  try{
    const allRecords = await ClassTimeTable.find({
      school: School_Id,
      "day": dayName,
    })
      .populate("class")
      .populate("subjects.teacher")
      .exec();
    return res.status(200).json(allRecords)
  }catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
  
})