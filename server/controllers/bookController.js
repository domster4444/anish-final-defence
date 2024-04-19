const Book = require("../models/bookModel");
const School = require("../models/schoolModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { addFile, deleteFile } = require("../utils/fileManipulation.js");

const ErrorHandler = require("../utils/errorHandler.js");

//TODO: CREATE BOOK
exports.createBook = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  const School_Folder_Name = req.headers["x-school-unique-id"];
  //! HEADERS
  const { schoolId, ...bookData } = req.body;

  try {
    if (!School_Id) {
      return next(new ErrorHandler("School ID is required", 400));
    }

    const schoolData = await School.findById({ _id: School_Id }).exec();
    console.log(schoolData);
    if (!schoolData) {
      return next(new ErrorHandler("School not found", 404));
    }

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

    console.log(req.file);

    const newBookData = {
      school: School_Id,
      coverImage,
      ...bookData,
    };

    const newBook = new Book(newBookData);
    await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler("Error creating book", 500));
  }
});

//TODO: GET ALL BOOK FOR A SCHOOL
exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find({}).populate("school").exec();

  if (!books) {
    return next(new ErrorHandler("No books found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    data: books,
  });
});
exports.getAllBooksForSchool = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const books = await Book.find({ school: id }).populate("school").exec();

  if (!books) {
    return next(new ErrorHandler("No books found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    data: books,
  });
});

//TODO: GET SINGLE BOOK
exports.getBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await Book.findById(id)
    .populate("school")
    .exec((error, book) => {
      if (error) {
        return next(new ErrorHandler("Server error", 500));
      }
      if (!book) {
        return next(new ErrorHandler("Book not found", 404));
      }
      return res.status(200).json({
        success: true,
        message: "Book data fetched successfully",
        data: book,
      });
    });
});

//TODO: UPDATE A BOOK
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  //! HEADERS
  const School_Folder_Name = req.headers["x-school-unique-id"];
  //! HEADERS

  try {
    const book = await Book.findById(id).exec();

    if (!book) {
      return next(new ErrorHandler("Book not found", 404));
    }

    let coverImage = book.coverImage;

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
      const fileName = `${Date.now()}.png`;
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

    book.set(updateData);
    book.coverImage = coverImage;

    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book has been updated successfully!",
      data: book,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

//TODO: DELETE A BOOK
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Folder_Name = req.headers["x-school-unique-id"];
  //! HEADERS
  const { id } = req.params;

  try {
    const book = await Book.findById(id).exec();

    if (!book) {
      return next(new ErrorHandler("Book not found", 404));
    }

    let coverImage = book.coverImage;

    if (coverImage) {
      await deleteFile(School_Folder_Name, coverImage)
        .then(() => {
          console.log(`Deleted old file: ${coverImage}`);
        })
        .catch((error) => {
          console.error(`Error deleting old file: ${error}`);
        });
    }

    await book.remove();

    return res.status(200).json({
      success: true,
      message: "Book has been deleted successfully!",
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

//TODO: GET ALL BOOK
exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find({}).populate("school").exec();

  if (!books) {
    return next(new ErrorHandler("No books found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    data: books,
  });
});

//  !! CREATING A SEPARATE GET ROUTE FOR SELECT OPTIONS That will return only name and _id
exports.getAllBookOption = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  try {
    const allRecords = await Book.find({
      school: School_Id,
    }).exec();

    if (!allRecords) {
      return next(new ErrorHandler("No  books were  found", 404));
    }

    const allBookOptions = allRecords.map((item) => {
      return {
        name: item.title,
        _id: item._id,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: allBookOptions,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});
