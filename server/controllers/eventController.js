const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Event = require("../models/eventModel");
const { addFile, deleteFile } = require("../utils/fileManipulation.js");
const fs = require("fs");

exports.addEventController = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];

  const { name, description, eventDate } = req.body;

  // print all files from array
  console.log("MY REQUEST==========================");
  console.log(req.files);
  console.log("MY REQUEST==========================");

  let fileNameList = [];
  let fileName = null;

  try {
    for (let i = 0; i < req.files.length; i++) {
      fileName = `${Date.now()}.png`;
      await addFile(School_Folder_Name, fileName, req.files[i].buffer)
        .then(async (filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
          fileNameList.push(fileName);
        })
        .catch((error) => {
          throw new ErrorHandler("Error occured while storing image", 500);
        });

      console.log("File Name List: ", fileNameList);
    }
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Error occured while adding image in gallery", 500));
  }

  const newRecord = new Event({
    school: School_Id,
    name,
    description,
    eventDate,
    photos: fileNameList,
    ...req.body,
  });

  await newRecord.save((err, success) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler("Error occured while inserting image to database", 500));
    }
  });
  return res.status(201).json({
    success: true,
    message: "Record has been created successfully!",
    data: {},
  });
});

// get all events records
exports.getAllEventsController = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  const events = await Event.find({ school: School_Id });

  if (!events) {
    return next(new ErrorHandler("No events found", 404));
  }

  res.status(200).json({
    success: true,
    events,
  });
});

//delete a event and all its images using loop
exports.deleteEventController = catchAsyncErrors(async (req, res, next) => {
  const School_Folder_Name = req.headers["x-school-unique-id"];
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHandler("Event not found", 404));
  }

  // delete all images from event
  for (let i = 0; i < event.photos.length; i++) {
    await deleteFile(School_Folder_Name, event.photos[i])
      .then((result) => {
        console.log(`File ${event.photos[i]} deleted successfully`);
      })
      .catch((error) => {
        console.log(`Error occured while deleting file ${event.photos[i]}`);
      });
  }

  await event.remove();

  res.status(200).json({
    success: true,
    message: "Event is deleted successfully.",
  });
});
