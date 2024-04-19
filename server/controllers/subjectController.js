const Subject = require("../models/subjectModel.js");
const School = require("../models/schoolModel.js");
const Class = require("../models/classModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");

//* CREATE SUBJECT
exports.createSubject = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  //? assignedClass is the classID to which the subject is assigned
  let { selectedClass, selectedSubjectArray, selectedSectionArray } = req.body;

  try {
    // check if assignedClass_Id is valid or not
    const assignedClass = await Class.findById({ _id: selectedClass }).exec();
    if (!assignedClass) {
      return next(new ErrorHandler("Assigned Class not found", 404));
    }
    // check if school exist or not
    if (!School_Id) {
      return next(new ErrorHandler("School id is required", 400));
    }

    const schoolData = await School.findById({ _id: School_Id }).exec();

    if (!schoolData) {
      return next(new ErrorHandler("School not found", 404));
    }

    const newSubjectData = {
      school: School_Id,
      assignedClass: selectedClass,
      name: JSON.parse(selectedSubjectArray),
      assignedSection: JSON.parse(selectedSectionArray),
    };

    const newSubject = new Subject(newSubjectData);

    //  !!!!!!! ADD VALIDATION THAT IF CLASS EXIST AND IT's SECTION SEEMS DUPLICATE TWICE

    await newSubject.save();

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: newSubject,
    });
  } catch (error) {
    return next(new ErrorHandler("Error creating Subject", 400));
  }
});

//* GET ALL SUBJECT FOR A SCHOOL
exports.getAllSubjectForSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const SchoolSubject = await Subject.find({ school: School_Id }).populate("school").populate("assignedClass").exec();

  if (!SchoolSubject) {
    return next(new ErrorHandler("No Subject found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Subject fetched successfully",
    data: SchoolSubject,
  });
});

//* GET SINGLE SUBJECT
exports.getSingleSubject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await Subject.findById(id)
    .populate("school")
    .populate("assignedClass")
    .exec((error, data) => {
      if (error) {
        return next(new ErrorHandler("Server error", 500));
      }
      if (!data) {
        return next(new ErrorHandler("Subject not found", 404));
      }
      return res.status(200).json({
        success: true,
        message: "Subject data fetched successfully",
        data: data,
      });
    });
});

//TODO: UPDATE SUBJECT
exports.updateSubject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const SchoolSubject = await Subject.findById(id).exec();

    if (!SchoolSubject) {
      return next(new ErrorHandler("Subject not found.", 404));
    }

    //? STRING-ARRAY TO OBJECT-ARRAY CONVERTER
    SchoolSubject.set({
      name: JSON.parse(updateData.selectedSubjectArray),
      assignedSection: JSON.parse(updateData.selectedSectionArray),
    });

    await SchoolSubject.save();

    return res.status(200).json({
      success: true,
      message: "Subject has been updated successfully!",
      data: SchoolSubject,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

//TODO: DELETE A Subject
exports.deleteSubject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const SchoolSubject = await Subject.findById(id).exec();

    if (!SchoolSubject) {
      return next(new ErrorHandler("Subject not found", 404));
    }

    await SchoolSubject.remove();

    return res.status(200).json({
      success: true,
      message: "Subject has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: GET ALL SUBJECT
exports.getAllSubject = catchAsyncErrors(async (req, res, next) => {
  try {
    const SchoolSubject = await Subject.find({}).populate("school").exec();

    if (!SchoolSubject) {
      return next(new ErrorHandler("No Subject found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Subject fetched successfully",
      data: SchoolSubject,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

exports.getAllSubjectForClass = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const { id } = req.params;
  try {
    let SchoolClassWithSubject = await Subject.find({ school: School_Id, assignedClass: id }).exec();
    if (!SchoolClassWithSubject) {
      return next(new ErrorHandler("No Subject found", 404));
    }

    SchoolClassWithSubject = SchoolClassWithSubject[0].name;

    console.log(SchoolClassWithSubject);

    SchoolClassWithSubject = SchoolClassWithSubject.map((subject) => {
      return {
        _id: subject,
        name: subject,
      };
    });

    console.log("hello", SchoolClassWithSubject);

    return res.status(200).json({
      success: true,
      message: "Subject fetched successfully",
      data: SchoolClassWithSubject,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// get subject array for a class and section
// body will contain class and section
// section can be A,B,C,D or null
// if section is null then it will return all the subjects for that class

exports.getSubjectArrayForClassAndSection = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const { classId, section } = req.body;
  try {
    if (classId) {
      if (section !== null) {
        let SchoolClassWithSubject = await Subject.find({ school: School_Id, assignedClass: classId }).exec();
        if (!SchoolClassWithSubject || SchoolClassWithSubject.length === 0) {
          return next(new ErrorHandler("No Subjects found", 404));
        }

        const allSubjectsWhereSectionIsIncluded = SchoolClassWithSubject.filter((subject) => {
          return subject.assignedSection.includes(section);
        });

        const formattedSubjects = allSubjectsWhereSectionIsIncluded.map((subject) => {
          return {
            _id: subject._id,
            name: subject.name,
          };
        });

        const arrayOfSubject = [];
        formattedSubjects.map((item) => {
          arrayOfSubject.push(item.name);
        });

        res.status(200).json({
          success: true,
          data: arrayOfSubject,
        });
      } else {
        let SchoolClassWithSubject = await Subject.find({ school: School_Id, assignedClass: classId }).exec();
        if (!SchoolClassWithSubject) {
          return next(new ErrorHandler("No Subject found", 404));
        }

        SchoolClassWithSubject = SchoolClassWithSubject[0].name;

        SchoolClassWithSubject = SchoolClassWithSubject.map((subject) => {
          return {
            _id: subject,
            name: subject,
          };
        });

        const subjectArray = [];
        SchoolClassWithSubject.map((item) => {
          subjectArray.push(item.name);
        });

        return res.status(200).json({
          success: true,
          message: "Subject fetched successfully",
          data: [subjectArray],
        });
      }
    }
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// get classes from Subject model it has property of assignedClass that need to be populated with "SchoolClass" ,
// each class will have _id and name
exports.getClassesFromSubject = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  try {
    const classes = await Subject.find({ school: School_Id }).populate("assignedClass").exec();
    if (!classes) {
      return next(new ErrorHandler("No classes found", 404));
    }
    const formattedClasses = classes.map((item) => {
      return {
        _id: item.assignedClass._id,
        name: item.assignedClass.name,
      };
    });
    res.status(200).json({
      success: true,
      data: formattedClasses,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});
