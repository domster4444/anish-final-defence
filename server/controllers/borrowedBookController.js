const BorrowedBook = require("../models/borrowedBookModel");
const School = require("../models/schoolModel.js");
const LibrarySetting = require("../models/librarySettingModel.js");
const BookFine = require("../models/bookFineModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");

//TODO: CREATE RECORD
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

    const newRecord = new BorrowedBook(dataToSave);

    await newRecord.save();

    res.status(201).json({
      success: true,
      message: "record created successfully",
      data: newRecord,
    });
  } catch (error) {
    return next(new ErrorHandler("Error creating record", 400));
  }
});

//TODO: GET ALL RECORD FOR A SCHOOL
exports.getAllRecordForSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const data = await BorrowedBook.find({ school: School_Id }).populate("school").populate("book").populate("student").exec();

  if (!data) {
    return next(new ErrorHandler("No records were found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Record Fetched successfully",
    data: data,
  });
});

//TODO: GET SINGLE RECORD detail
exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await BorrowedBook.findById(id)
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

//TODO: UPDATE RECORD
exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log(updateData);

  try {
    const ExistingRecord = await BorrowedBook.findById(id).exec();

    if (!ExistingRecord) {
      return next(new ErrorHandler(" record not found .", 404));
    }

    ExistingRecord.set(updateData);

    await ExistingRecord.save();

    return res.status(200).json({
      success: true,
      message: "record has been updated successfully!",
      data: ExistingRecord,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

//TODO: DELETE A RECORD
exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const recordToDelete = await BorrowedBook.findById(id).exec();

    if (!recordToDelete) {
      return next(new ErrorHandler("record not found", 404));
    }

    await recordToDelete.remove();

    return res.status(200).json({
      success: true,
      message: "record has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: GET ALL RECORD
exports.getAllRecord = catchAsyncErrors(async (req, res, next) => {
  try {
    const allRecords = await BorrowedBook.find({}).populate("school").exec();

    if (!allRecords) {
      return next(new ErrorHandler("No Class found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: allRecords,
    });
  } catch (err) {
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: GET ALL BORROWERS OF A BOOK BASED ON BOOK ID in params
exports.getAllBorrowersOfABook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const allRecords = await BorrowedBook.find({ book: id }).populate("school").populate("book").populate("student").exec();

  if (!allRecords) {
    return next(new ErrorHandler("No Class found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Record fetched successfully",
    data: allRecords,
  });
});

// ! create controller that takes borrowedBookId and takes date.now and with date.now , dateToReturn from borrowed book Model ,then take penaltyRecurrenceInterval fineAmount from librarySettingModel.
// ! then check if date.now is greater than dateToReturn, if yes, then calculate the difference between date.now and dateToReturn and divide it by penaltyRecurrenceInterval and multiply it by fineAmount

exports.calculateFine = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log("borrowed book id is", id);
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  let todayDate = new Date();

  const borrowedBook = await BorrowedBook.findById({
    _id: id,
  }).exec();
  let dateToReturnBook = borrowedBook.dateToReturn;
  let penaltyRecurrenceInterval;
  let fineAmount;

  const librarySetting = await LibrarySetting.findOne({ school: School_Id }).exec();
  if (!librarySetting) {
    return next(new ErrorHandler("Library Setting not found", 404));
  }
  penaltyRecurrenceInterval = librarySetting.penaltyRecurrenceInterval;
  fineAmount = librarySetting.fineAmount;

  let daysLate;
  if (todayDate > dateToReturnBook) {
    let difference = todayDate - dateToReturnBook;
    daysLate = Math.floor(difference / (1000 * 3600 * 24));
  } else {
    daysLate = 0;
  }

  console.log("today date is", todayDate);
  console.log("date to return is", dateToReturnBook);
  console.log("penaltyRecurrenceInterval is", penaltyRecurrenceInterval);
  console.log("fineAmount is", fineAmount);

  if (todayDate > dateToReturnBook) {
    let difference = todayDate - dateToReturnBook;
    let numberOfDays = Math.floor(difference / (1000 * 3600 * 24));
    let fine = Math.floor(numberOfDays / penaltyRecurrenceInterval) * fineAmount;

    return res.status(200).json({
      success: true,
      daysLate: daysLate,
      fineApplicable: true,
      message: "Fine calculated successfully",
      data: fine,
    });
  } else {
    return res.status(200).json({
      success: true,
      fineApplicable: false,
      message: "No Fine",
      data: 0,
    });
  }
});

// ! return borrowed book controller
// in this controller it takes no of book returned and borrowedBookId
// if no of book returned is less than no of book borrowed then borrowedBook status  is borrowed and
// if no of book returned is equal to no of book borrowed then borrowedBook status is returned
// also add to noOfReturnedBooks   that user has returned

exports.returnBorrowedBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { noOfReturnedBooks } = req.body;
  console.log("borrowed book id is", id);
  console.log("no of returned book is", noOfReturnedBooks);

  const borrowedBook = await BorrowedBook.findById({
    _id: id,
  }).exec();

  if (!borrowedBook) {
    return next(new ErrorHandler("Borrowed Book not found", 404));
  }

  // check if noOfReturnedBooks  + noOfReturnedBooks is greater than quantity of book borrowed

  if (Number(noOfReturnedBooks) + Number(borrowedBook.noOfReturnedBooks) > Number(borrowedBook.quantity)) {
    console.log(noOfReturnedBooks);
    console.log(borrowedBook.noOfReturnedBooks);
    console.log(borrowedBook.quantity);
    return next(new ErrorHandler("No of returned books cannot be greater than no of borrowed books", 400));
  }

  if (noOfReturnedBooks < borrowedBook.quantity) {
    borrowedBook.status = "borrowed";
    borrowedBook.noOfReturnedBooks = Number(borrowedBook.noOfReturnedBooks) + Number(noOfReturnedBooks);

    // if sum of existing noOfReturnedBooks and book returned now is equal to quantity of book borrowed then status is returned
    if (borrowedBook.noOfReturnedBooks == borrowedBook.quantity) {
      borrowedBook.status = "returned";
      // actualDateReturned
      borrowedBook.lastDateWhenBookWasReturned = Date.now();
    }

    await borrowedBook.save();
  }

  if (noOfReturnedBooks == borrowedBook.quantity) {
    borrowedBook.status = "returned";
    // lastDateWhenBookWasReturned
    borrowedBook.lastDateWhenBookWasReturned = Date.now();
    borrowedBook.noOfReturnedBooks = noOfReturnedBooks;
    await borrowedBook.save();
  }

  return res.status(200).json({
    success: true,
    message: "Borrowed Book returned successfully",
    data: borrowedBook,
  });
});

// pay fine if it's late controller
// it takes borrowedBookId and fineAmount

exports.payFine = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS
  const { id } = req.params;
  const { fineAmountPaid, student } = req.body;
  console.log("student is", student);

  if (fineAmountPaid == 0) {
    res.status(200).json({
      success: true,
      message: "Fine already paid",
      data: 0,
    });
    return;
  }

  console.log("borrowed book id is", id);
  console.log("fine amount is", fineAmountPaid);

  const borrowedBook = await BorrowedBook.findById({
    _id: id,
  })
    .populate("book")
    .exec();

  if (!borrowedBook) {
    return next(new ErrorHandler("Borrowed Book not found", 404));
  }

  borrowedBook.isFinePaid = true;
  borrowedBook.fineAmountPaid = Number(borrowedBook.fineAmountPaid) + Number(fineAmountPaid);

  await borrowedBook.save();

  // also add record in finePaidHistory model
  const dataToSave = {
    school: School_Id,
    bookName: borrowedBook.book.title,
    fineAmount: fineAmountPaid,
    student: student,
    fineType: "late",
  };

  const newRecord = new BookFine(dataToSave);

  await newRecord.save();

  return res.status(200).json({
    success: true,
    message: "Fine Paid successfully",
    data: borrowedBook,
  });
});

// lost book controller
// it takes borrowedBookId and fineAmount , where fine amount can be zero as well but still fine will be added in   bookFineModel
// let status of borrowedBook be returned with lost fine
// let isFinePaid be true
// and all other is same as of returnBorrowedBook controller

exports.lostBookFine = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS
  const { id } = req.params;
  const { fineAmountPaid, student, noOfLostBooks } = req.body;

  console.log("borrowed book id is", id);
  console.log("fine amount is", fineAmountPaid);

  const borrowedBook = await BorrowedBook.findById({
    _id: id,
  })
    .populate("book")
    .exec();

  if (!borrowedBook) {
    return next(new ErrorHandler("Borrowed Book not found", 404));
  }

  borrowedBook.status = "returned with lost fine";
  borrowedBook.isFinePaid = true;
  borrowedBook.fineAmountPaid = Number(borrowedBook.fineAmountPaid) + Number(fineAmountPaid);

  await borrowedBook.save();

  // also add record in finePaidHistory model
  const dataToSave = {
    school: School_Id,
    bookName: borrowedBook.book.title,
    fineAmount: fineAmountPaid,
    fineType: "lost",
    student: student,
    noOfLostBooks: noOfLostBooks,
  };

  const newRecord = new BookFine(dataToSave);

  await newRecord.save();

  return res.status(200).json({
    success: true,
    message: "Fine Paid successfully",
    data: borrowedBook,
  });
});

// damaged book fine all same as lost book fine but status is returned with damage fine

exports.damagedBookFine = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS
  const { id } = req.params;
  const { fineAmountPaid, student, noOfDamagedBooks } = req.body;

  console.log("borrowed book id is", id);
  console.log("fine amount is", fineAmountPaid);

  const borrowedBook = await BorrowedBook.findById({
    _id: id,
  })
    .populate("book")
    .exec();

  if (!borrowedBook) {
    return next(new ErrorHandler("Borrowed Book not found", 404));
  }

  borrowedBook.status = "returned with damage fine";
  borrowedBook.isFinePaid = true;
  borrowedBook.fineAmountPaid = Number(borrowedBook.fineAmountPaid) + Number(fineAmountPaid);

  await borrowedBook.save();

  // also add record in finePaidHistory model
  const dataToSave = {
    school: School_Id,
    bookName: borrowedBook.book.title,
    fineAmount: fineAmountPaid,
    fineType: "damaged",
    student: student,
    noOfDamagedBooks: noOfDamagedBooks,
  };

  const newRecord = new BookFine(dataToSave);

  await newRecord.save();

  return res.status(200).json({
    success: true,
    message: "Fine Paid successfully",
    data: borrowedBook,
  });
});
