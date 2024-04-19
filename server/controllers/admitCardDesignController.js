const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const AdmitCardDesign = require("../models/admitCardDesignModel.js");
const { addFile, deleteFile } = require("../utils/fileManipulation.js");

exports.addRecordController = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];

  try {
    let fileName = null;
    console.log("schoolID", School_Id);
    console.log("school Folder Name", School_Folder_Name);
    console.log(req.files.design[0]);

    let DesignFileName = null;

    if (req.files.design[0]) {
      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.pdf`;

      await addFile(School_Folder_Name, fileName, req.files.design[0].buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          DesignFileName = fileName;
          console.log("FILE NAME IS = ", fileName);
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
        });
    }

    const newDesignRecord = new AdmitCardDesign({
      school: School_Id,
      design: DesignFileName,
    });

    await newDesignRecord.save();

    res.status(200).json({
      success: true,
      message: "Record has been created successfully!",
      data: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error, Try Again Later",
    });
  }
});

exports.getAllRecordForASchoolController = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const allRecord = await AdmitCardDesign.find({ school: School_Id }).populate("school").exec();
  if (!allRecord) {
    return res.status(404).json({
      success: false,
      message: "No gallery images found.",
    });
  }
  return res.status(200).json({
    success: true,
    message: "All gallery images fetched successfully!",
    data: allRecord,
  });
});

exports.deleteRecordController = catchAsyncErrors(async (req, res, next) => {
  const School_Folder_Name = req.headers["x-school-unique-id"];
  const recordId = req.params.id;

  try {
    const record = await AdmitCardDesign.findById(recordId);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "No record found.",
      });
    }

    if (record.design) {
      await deleteFile(School_Folder_Name, record.design)
        .then(() => {
          console.log(`File ${record.design} deleted successfully`);
        })
        .catch((error) => {
          console.error(`Error deleting file: ${error}`);
        });
    }

    await record.remove();

    res.status(200).json({
      success: true,
      message: "Record has been deleted successfully!",
      data: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error, Try Again Later",
    });
  }
});
