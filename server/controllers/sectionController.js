const Section = require("../models/sectionModel.js");
const School = require("../models/schoolModel");
const ClassModel = require("../models/classModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler.js");

//TODO: CREATE SECTION
exports.createSection = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS
  const { name } = req.body;

  try {
    if (!School_Id) {
      return next(new ErrorHandler("School ID is required", 400));
    }

    const schoolData = await School.findById({ _id: School_Id }).exec();
    console.log(schoolData);
    if (!schoolData) {
      return next(new ErrorHandler("School not found", 404));
    }

    const newSectionData = {
      school: School_Id,
      name,
    };

    const newSection = new Section(newSectionData);

    const isSectionExist = await Section.findOne({ school: School_Id, name }).exec();
    if (isSectionExist) {
      return next(new ErrorHandler("Section already exists", 400));
    }

    await newSection.save();

    res.status(201).json({
      success: true,
      message: "Section created successfully",
      data: newSection,
    });
  } catch (error) {
    return next(new ErrorHandler("Error creating section", 400));
  }
});

//TODO: GET ALL SECTION FOR A SCHOOL
exports.getAllSectionForSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const SchoolSection = await Section.find({ school: School_Id }).populate("school").exec();

  if (!SchoolSection) {
    return next(new ErrorHandler("No Section found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Section fetched successfully",
    data: SchoolSection,
  });
});

//TODO: GET SINGLE SECTION
exports.getSingleSection = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await Section.findById(id)
    .populate("school")
    .exec((error, data) => {
      if (error) {
        return next(new ErrorHandler("Server error", 500));
      }
      if (!data) {
        return next(new ErrorHandler("Section not found", 404));
      }
      return res.status(200).json({
        success: true,
        message: "Section data fetched successfully",
        data: data,
      });
    });
});

//TODO: UPDATE SECTION
exports.updateSection = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const SchoolSection = await Section.findById(id).exec();

    if (!SchoolSection) {
      return next(new ErrorHandler("Section not found.", 404));
    }

    SchoolSection.set(updateData);

    await SchoolSection.save();

    return res.status(200).json({
      success: true,
      message: "Section has been updated successfully!",
      data: SchoolSection,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

//TODO: DELETE A SECTION
exports.deleteSection = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const SchoolSection = await Section.findById(id).exec();

    if (!SchoolSection) {
      return next(new ErrorHandler("Section not found", 404));
    }

    await SchoolSection.remove();

    return res.status(200).json({
      success: true,
      message: "Section has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: GET ALL SECTION
exports.getAllSection = catchAsyncErrors(async (req, res, next) => {
  try {
    const SchoolClass = await Section.find({}).populate("school").exec();

    if (!SchoolClass) {
      return next(new ErrorHandler("No Class found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Section fetched successfully",
      data: SchoolClass,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

//  !! CREATING A SEPARATE GET ROUTE FOR SELECT OPTIONS That will return only name and _id
exports.getAllSectionForClass = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const { id } = req.params;
  try {
    const SchoolClassWithSections = await ClassModel.find({ school: School_Id, _id: id }).populate("sections").exec();
    let sectionNames = SchoolClassWithSections[0].sections.map((section) => section.name);

    // convert section to {_id , name} logic is as below
    // let existingData = data.map((item) => {
    //   return {
    //     name: item.name,
    //     _id: item.name,
    //   };
    // });

    sectionNames = sectionNames.map((name, index) => {
      return { _id: SchoolClassWithSections[0].sections[index].name, name: SchoolClassWithSections[0].sections[index].name };
    });

    return res.status(200).json({
      success: true,
      message: "Section fetched successfully",
      data: sectionNames,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});
