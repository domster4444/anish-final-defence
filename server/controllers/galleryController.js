const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Gallery = require("../models/galleryModel.js");
const { addFile, deleteFile } = require("../utils/fileManipulation.js");
const fs = require("fs");

exports.addGalleryController = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];
  let fileName = null;

  console.log("schoolID", School_Id);
  console.log("school Folder Name", School_Folder_Name);
  console.log("MY REQUEST==========================");
  console.log(req.file);
  console.log("MY REQUEST==========================");

  if (req.file) {
    console.log("File is present, proceeding with upload operations");
    fileName = `${Date.now()}.png`;
    await addFile(School_Folder_Name, fileName, req.file.buffer)
      .then((filePath) => {
        console.log(`File ${fileName} added at path: ${filePath}`);
      })
      .catch((error) => {
        console.error(`Error adding file: ${error}`);
      });
  }
  const newGalleryImage = new Gallery({
    school: School_Id,
    image: fileName,
    ...req.body,
  });
  await newGalleryImage.save((err, success) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler("Error occured while adding image in gallery", 500));
    }
    return res.status(201).json({
      success: true,
      message: "Gallery has been created successfully!",
      data: success,
    });
  });
});

exports.deleteGalleryImageController = catchAsyncErrors(async (req, res, next) => {
  const galleryImageId = req.params.id;
  const School_Folder_Name = req.headers["x-school-unique-id"];

  try {
    const existingGalleryImage = await Gallery.findById(galleryImageId).exec();

    if (!existingGalleryImage) {
      return res.status(404).json({
        success: false,
        message: "Image doesn't exist.",
      });
    }
    // Delete the associated image file, if it exists
    const fileName = existingGalleryImage.image;
    if (fileName) {
      await deleteFile(School_Folder_Name, fileName)
        .then(() => {
          console.log(`Deleted old file: ${fileName}`);
        })
        .catch((error) => {
          console.error(`Error deleting old file: ${error}`);
        });
    }
    // Remove the school from the database
    await existingGalleryImage.remove();
    return res.status(200).json({
      success: true,
      message: "gallery image has been deleted successfully!",
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

exports.getAllGalleryImagesForASchoolController = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const allGalleryImages = await Gallery.find({ school: School_Id }).populate("school").exec();
  if (!allGalleryImages) {
    return res.status(404).json({
      success: false,
      message: "No gallery images found.",
    });
  }
  return res.status(200).json({
    success: true,
    message: "All gallery images fetched successfully!",
    data: allGalleryImages,
    anyImageDownloadUrl: "",
  });
});

exports.addBulkGalleryController = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];
  let fileName = null;

  // print all files from array
  console.log("MY REQUEST==========================");
  console.log(req.files);
  console.log("MY REQUEST==========================");

  try {
    for (let i = 0; i < req.files.length; i++) {
      fileName = `${Date.now()}.png`;
      await addFile(School_Folder_Name, fileName, req.files[i].buffer)
        .then(async (filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
        })
        .catch((error) => {
          throw new ErrorHandler("Error occured while storing image", 500);
        });

      const newGalleryImage = new Gallery({
        school: School_Id,
        image: fileName,
        ...req.body,
      });

      await newGalleryImage.save((err, success) => {
        if (err) {
          console.log(err);
          return next(new ErrorHandler("Error occured while inserting image to database", 500));
        }
      });
    }
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Error occured while adding image in gallery", 500));
  }

  return res.status(201).json({
    success: true,
    message: "Gallery has been created successfully!",
    data: {},
  });
});

exports.getGalleryStatsController = catchAsyncErrors(async (req, res, next) => {
  // get total images in gallery, get total uploaded this month, get total uploaded this year , total storage used by gallery images, average image size

  let totalImages = 0;
  let totalUploadedThisYear = 0;
  let totalUploadedThisMonth = 0;
  let totalStorageSize = 0;

  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];

  const allGalleryImages = await Gallery.find({ school: School_Id }).populate("school").exec();

  totalImages = allGalleryImages.length;

  // ! calculate totalUploadedThisMonth
  allGalleryImages.forEach((image) => {
    if (image.createdAt.getMonth() == new Date().getMonth()) {
      totalUploadedThisMonth++;
    }
  });

  //! calculate totalUploadedThisYear
  allGalleryImages.forEach((image) => {
    if (image.createdAt.getFullYear() == new Date().getFullYear()) {
      totalUploadedThisYear++;
    }
  });

  //! calculate totalStorageSize in storage folder
  // go to ../storage/School_Folder_Name and iterate through every file
  const directoryPath = `./storage/${School_Folder_Name}`;
  fs.readdir(directoryPath, async function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      // get the file size and save in totalSize

      const stats = fs.statSync(`./storage/${School_Folder_Name}/${file}`);
      const fileSizeInBytes = stats.size;
      //Convert the file size to megabytes (optional)
      const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

      totalStorageSize += fileSizeInMegabytes;
    });

    //! calculate average image size
    const averageImageSize = totalStorageSize / totalImages;

    return res.status(200).json({
      success: true,
      message: "Gallery stats fetched successfully!",
      data: {
        totalImages,
        totalUploadedThisMonth,
        totalUploadedThisYear,
        totalStorageSize: totalStorageSize.toFixed(2),
        averageImageSize: averageImageSize.toFixed(2),
      },
    });
  });
});
