const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const IdCardDesign = require("../models/idCardDesignModel.js");
const { addFile, deleteFile } = require("../utils/fileManipulation.js");

exports.addRecordController = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];

  try {
    let fileName = null;
    console.log("schoolID", School_Id);
    console.log("school Folder Name", School_Folder_Name);
    console.log(req.files.redCardFrontDesign[0]);
    console.log(req.files.redCardBackDesign[0]);
    console.log(req.files.greenCardFrontDesign[0]);
    console.log(req.files.greenCardBackDesign[0]);
    console.log(req.files.blueCardFrontDesign[0]);
    console.log(req.files.blueCardBackDesign[0]);
    console.log(req.files.yellowCardFrontDesign[0]);
    console.log(req.files.yellowCardBackDesign[0]);

    let redCardFrontDesignFileNames = null;
    let redCardBackDesignFileNames = null;
    let greenCardFrontDesignFileNames = null;
    let greenCardBackDesignFileNames = null;
    let blueCardFrontDesignFileNames = null;
    let blueCardBackDesignFileNames = null;
    let yellowCardFrontDesignFileNames = null;
    let yellowCardBackDesignFileNames = null;

    if (req.files.redCardFrontDesign[0]) {
      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.pdf`;
      await addFile(School_Folder_Name, fileName, req.files.redCardFrontDesign[0].buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          redCardFrontDesignFileNames = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
        });
    }

    if (req.files.redCardBackDesign[0]) {
      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.pdf`;
      await addFile(School_Folder_Name, fileName, req.files.redCardBackDesign[0].buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          redCardBackDesignFileNames = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
        });
    }

    if (req.files.greenCardFrontDesign[0]) {
      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.pdf`;
      await addFile(School_Folder_Name, fileName, req.files.greenCardFrontDesign[0].buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          greenCardFrontDesignFileNames = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
        });
    }

    if (req.files.greenCardBackDesign[0]) {
      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.pdf`;
      await addFile(School_Folder_Name, fileName, req.files.greenCardBackDesign[0].buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          greenCardBackDesignFileNames = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
        });
    }

    if (req.files.blueCardFrontDesign[0]) {
      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.pdf`;
      await addFile(School_Folder_Name, fileName, req.files.blueCardFrontDesign[0].buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          blueCardFrontDesignFileNames = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
        });
    }

    if (req.files.blueCardBackDesign[0]) {
      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.pdf`;
      await addFile(School_Folder_Name, fileName, req.files.blueCardBackDesign[0].buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          blueCardBackDesignFileNames = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
        });
    }

    if (req.files.yellowCardFrontDesign[0]) {
      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.pdf`;
      await addFile(School_Folder_Name, fileName, req.files.yellowCardFrontDesign[0].buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          yellowCardFrontDesignFileNames = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
        });
    }

    if (req.files.yellowCardBackDesign[0]) {
      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.pdf`;
      await addFile(School_Folder_Name, fileName, req.files.yellowCardBackDesign[0].buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          yellowCardBackDesignFileNames = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
        });
    }

    const newIdCardDesignRecord = new IdCardDesign({
      school: School_Id,
      redCardFrontDesign: redCardFrontDesignFileNames,
      redCardBackDesign: redCardBackDesignFileNames,
      greenCardFrontDesign: greenCardFrontDesignFileNames,
      greenCardBackDesign: greenCardBackDesignFileNames,
      blueCardFrontDesign: blueCardFrontDesignFileNames,
      blueCardBackDesign: blueCardBackDesignFileNames,
      yellowCardFrontDesign: yellowCardFrontDesignFileNames,
      yellowCardBackDesign: yellowCardBackDesignFileNames,
    });

    await newIdCardDesignRecord.save();

    res.status(200).json({
      success: true,
      message: "Record has been created successfully!",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error, Try Again Later",
    });
  }
});

exports.getAllRecordForASchoolController = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const allRecord = await IdCardDesign.find({ school: School_Id }).populate("school").exec();
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
    const record = await IdCardDesign.findById(recordId);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "No record found.",
      });
    }

    if (record.redCardFrontDesign) {
      await deleteFile(School_Folder_Name, record.redCardFrontDesign)
        .then(() => {
          console.log(`File ${record.redCardFrontDesign} deleted successfully`);
        })
        .catch((error) => {
          console.error(`Error deleting file: ${error}`);
        });
    }

    if (record.redCardBackDesign) {
      await deleteFile(School_Folder_Name, record.redCardBackDesign)
        .then(() => {
          console.log(`File ${record.redCardBackDesign} deleted successfully`);
        })
        .catch((error) => {
          console.error(`Error deleting file: ${error}`);
        });
    }

    if (record.greenCardFrontDesign) {
      await deleteFile(School_Folder_Name, record.greenCardFrontDesign)
        .then(() => {
          console.log(`File ${record.greenCardFrontDesign} deleted successfully`);
        })
        .catch((error) => {
          console.error(`Error deleting file: ${error}`);
        });
    }

    if (record.greenCardBackDesign) {
      await deleteFile(School_Folder_Name, record.greenCardBackDesign)
        .then(() => {
          console.log(`File ${record.greenCardBackDesign} deleted successfully`);
        })
        .catch((error) => {
          console.error(`Error deleting file: ${error}`);
        });
    }

    if (record.blueCardFrontDesign) {
      await deleteFile(School_Folder_Name, record.blueCardFrontDesign)
        .then(() => {
          console.log(`File ${record.blueCardFrontDesign} deleted successfully`);
        })
        .catch((error) => {
          console.error(`Error deleting file: ${error}`);
        });
    }

    if (record.blueCardBackDesign) {
      await deleteFile(School_Folder_Name, record.blueCardBackDesign)
        .then(() => {
          console.log(`File ${record.blueCardBackDesign} deleted successfully`);
        })
        .catch((error) => {
          console.error(`Error deleting file: ${error}`);
        });
    }

    if (record.yellowCardFrontDesign) {
      await deleteFile(School_Folder_Name, record.yellowCardFrontDesign)
        .then(() => {
          console.log(`File ${record.yellowCardFrontDesign} deleted successfully`);
        })
        .catch((error) => {
          console.error(`Error deleting file: ${error}`);
        });
    }

    if (record.yellowCardBackDesign) {
      await deleteFile(School_Folder_Name, record.yellowCardBackDesign)
        .then(() => {
          console.log(`File ${record.yellowCardBackDesign} deleted successfully`);
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
