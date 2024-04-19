const BookCategory = require("../models/bookCategoryModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create a new book category
exports.createBookCategory = catchAsyncErrors(async (req, res, next) => {
  const { school, categoryName } = req.body;

  const bookCategory = new BookCategory({
    school,
    categoryName,
  });

  await bookCategory.save();

  res.status(201).json({
    success: true,
    message: "Book category created successfully",
    data: bookCategory,
  });
});

// Get all book categories for a school
exports.getAllBookCategories = catchAsyncErrors(async (req, res, next) => {
  const bookCategories = await BookCategory.find();

  res.status(200).json({
    success: true,
    message: "All book categories fetched successfully",
    data: bookCategories,
  });
});

// Get a specific book category by its ID
exports.getBookCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const bookCategory = await BookCategory.findById(id);

  if (!bookCategory) {
    return next(new ErrorHandler("Book category not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Book category fetched successfully",
    data: bookCategory,
  });
});

// Update a specific book category by its ID
exports.updateBookCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  const bookCategory = await BookCategory.findByIdAndUpdate(id, { categoryName }, { new: true });

  if (!bookCategory) {
    return next(new ErrorHandler("Book category not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Book category updated successfully",
    data: bookCategory,
  });
});

// Delete a specific book category by its ID
exports.deleteBookCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const bookCategory = await BookCategory.findByIdAndRemove(id);

  if (!bookCategory) {
    return next(new ErrorHandler("Book category not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Book category deleted successfully",
    data: {},
  });
});

// get all categories for a school
exports.getAllBookCategoriesForSchool = catchAsyncErrors(async (req, res, next) => {
  const { school } = req.body;
  const bookCategories = await BookCategory.find({ school });

  res.status(200).json({
    success: true,
    message: "All book categories fetched successfully",
    data: bookCategories,
  });
});
