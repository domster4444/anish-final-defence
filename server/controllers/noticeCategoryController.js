const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const noticeCatgeories = require('../models/noticeCategoryModel');
const ErrorHandler = require("../utils/errorHandler")

//create new category
exports.createNewCategory = catchAsyncErrors(async (req, res, next) => {
    const { categoryName } = req.body;

    const newCategory = new noticeCatgeories({
        school: req.headers["x-school-id"],
        categoryName: categoryName
    })
    newCategory.save();

    res.status(201).json({
        success: true,
        message: "New notice category created.",
        data: newCategory
    });
});

//get all notice categories
exports.getAllNoticeCategories = catchAsyncErrors(async (req, res, next) => {
    const allNoticeCategories = await noticeCatgeories.find({ school: req.headers["x-school-id"] }).sort({ "updatedAt": -1 });

    res.status(200).json({
        success: true,
        message: "Notice category fetched successfully.",
        data: allNoticeCategories
    });
});

//delete notice actegories by id
exports.deleteNoticeCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const deleteNoticeCategory = await noticeCatgeories.findByIdAndRemove(id);

    if (!deleteNoticeCategory) {
        return next(new ErrorHandler("Noice category not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Notice category deleted.",
        data: deleteNoticeCategory
    });
});


