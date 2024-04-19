const HostelRoom = require("../models/hostelRoomModel.js");
const School = require("../models/schoolModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");

//TODO: CREATE Hostel Room
exports.createRecord = catchAsyncErrors(async (req, res, next) => {
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

    const newHostelRoom = new HostelRoom(dataToSave);

    const isDuplication = await HostelRoom.findOne({ school: School_Id, name: req.body.name }).exec();
    if (isDuplication) {
      return next(new ErrorHandler("record already exists", 400));
    }

    await newHostelRoom.save();

    res.status(201).json({
      success: true,
      message: "record created successfully",
      data: newHostelRoom,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Error creating record", 400));
  }
});

//TODO: GET ALL Hostel Room  FOR A SCHOOL
exports.getAllRecordForSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const data = await HostelRoom.find({ school: School_Id }).populate("school").populate("hostel").populate("hostelRoomType").exec();

  if (!data) {
    return next(new ErrorHandler("No records were found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Record Fetched successfully",
    data: data,
  });
});

//TODO: GET SINGLE Hostel Room  detail
exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await HostelRoom.findById(id)
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

//TODO: UPDATE Hostel Room
exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const ExistingHostelRoom = await HostelRoom.findById(id).exec();

    if (!ExistingHostelRoom) {
      return next(new ErrorHandler(" record not found .", 404));
    }

    ExistingHostelRoom.set(updateData);

    await ExistingHostelRoom.save();

    return res.status(200).json({
      success: true,
      message: "record has been updated successfully!",
      data: ExistingHostelRoom,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

//TODO: DELETE A Hostel Room
exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const ExistingHostelRoom = await HostelRoom.findById(id).exec();

    if (!ExistingHostelRoom) {
      return next(new ErrorHandler("record not found", 404));
    }

    await ExistingHostelRoom.remove();

    return res.status(200).json({
      success: true,
      message: "record has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: GET ALL Hostel Room
exports.getAllRecord = catchAsyncErrors(async (req, res, next) => {
  try {
    const HostelRoom = await HostelRoom.find({}).populate("school").exec();

    if (!HostelRoom) {
      return next(new ErrorHandler("No Class found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: HostelRoom,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

//  !! CREATING A SEPARATE GET ROUTE FOR SELECT OPTIONS That will return only name and _id
exports.getAllAssociatedRoomsForSpecificHostel = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  const { name } = req.params;
  console.log(name);

  try {
    const allRecords = await HostelRoom.find({
      school: School_Id,
    })
      .populate("hostel")
      .exec();

    if (!allRecords) {
      return next(new ErrorHandler("No hostel rooms for requested hostel is found", 404));
    }

    const filteredRecordsWithRoomsOfSpecificHostel = allRecords.filter((item) => {
      return item.hostel.name === name;
    });

    // convert it to {_id , name} logic is as below
    // let allRecord = data.map((item) => {
    //   return {
    //     name: item.name,
    //     _id: item.name,
    //   };
    // });

    const allRoomsAssociatedToHostel = filteredRecordsWithRoomsOfSpecificHostel.map((item) => {
      return {
        name: item.name,
        _id: item._id,
      };
    });

    console.log(allRoomsAssociatedToHostel);

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: allRoomsAssociatedToHostel,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});
