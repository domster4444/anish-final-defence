const PostModel = require("../models/postModel.js");
const School = require("../models/schoolModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const { addFile, deleteFile } = require("../utils/fileManipulation.js");

const ErrorHandler = require("../utils/errorHandler.js");

//TODO: CREATE RECORD
exports.createRecord = catchAsyncErrors(async (req, res, next) => {
  const School_Folder_Name = "main-website";

  try {
    console.log(req.file);
    let coverImage = null;

    if (req.file) {
      console.log("File is present, proceeding with upload operations");
      const fileName = `${Date.now()}.png`;
      await addFile(School_Folder_Name, fileName, req.file.buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          coverImage = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
        });
    }

    const newRecordData = {
      attachment: coverImage,
      ...req.body,
    };

    const newRecord = new PostModel(newRecordData);
    await newRecord.save();

    res.status(201).json({
      success: true,
      message: "Record created successfully",
      data: newRecord,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Error creating record", 500));
  }
});

//TODO: GET ALL RECORD FOR A SCHOOL
exports.getAllRecordForSchool = catchAsyncErrors(async (req, res, next) => {
  const record = await PostModel.find({}).exec();

  if (!record) {
    return next(new ErrorHandler("No Record found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Record fetched successfully",
    data: record,
  });
});

//TODO: GET SINGLE
exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await PostModel.findById({
    _id: id,
  }).exec((error, record) => {
    if (error) {
      return next(new ErrorHandler("Server error", 500));
    }
    if (!record) {
      return next(new ErrorHandler("Record not found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: record,
    });
  });
});

//TODO: UPDATE RECORD
exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const School_Folder_Name = "main-website";

  try {
    const existingRecord = await PostModel.findById({
      _id: id,
    }).exec();

    if (!existingRecord) {
      return next(new ErrorHandler("Record not found", 404));
    }

    let coverImage = existingRecord.attachment;

    let fileName = null;
    if (req.file) {
      if (coverImage) {
        await deleteFile(School_Folder_Name, coverImage)
          .then(() => {
            console.log(`Deleted old file: ${coverImage}`);
          })
          .catch((error) => {
            console.error(`Error deleting old file: ${error}`);
            return next(new ErrorHandler("Error deleting file", 500));
          });
      }

      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.png`;
      await addFile(School_Folder_Name, fileName, req.file.buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          coverImage = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
          return next(new ErrorHandler("Error uploading file", 500));
        });
    }

    existingRecord.set(updateData);
    if (fileName !== null) {
      existingRecord.attachment = fileName;
    }

    await existingRecord.save();

    return res.status(200).json({
      success: true,
      message: "Record has been updated successfully!",
      data: existingRecord,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

//TODO: DELETE RECORD
exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const School_Folder_Name = "main-website";

  try {
    const existingRecord = await PostModel.findById(id).exec();

    if (!existingRecord) {
      return next(new ErrorHandler("Record not found", 404));
    }

    let coverImage = existingRecord.attachment;

    if (coverImage) {
      await deleteFile(School_Folder_Name, coverImage)
        .then(() => {
          console.log(`Deleted old file: ${coverImage}`);
        })
        .catch((error) => {
          console.error(`Error deleting old file: ${error}`);
        });
    }

    await existingRecord.remove();

    return res.status(200).json({
      success: true,
      message: "Record has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error, Try Again Later",
    });
  }
});

//TODO: GET ALL RECORD
exports.getAllRecord = catchAsyncErrors(async (req, res, next) => {
  const record = await PostModel.find({}).exec();

  if (!record) {
    return next(new ErrorHandler("No Record found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Record fetched successfully",
    data: record,
  });
});

// get data of single record by id
exports.getSinglePost = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await PostModel.findById({
    _id: id,
  }).exec((error, record) => {
    if (error) {
      return next(new ErrorHandler("Server error", 500));
    }
    if (!record) {
      return next(new ErrorHandler("Record not found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: record,
    });
  });
});
