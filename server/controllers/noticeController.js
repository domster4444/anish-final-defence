const Notices = require("../models/noticeModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//create new notice
exports.createNotice = catchAsyncErrors(async (req, res, next) => {

    const { noticeFrom, noticeTitle, noticeFor, noticeCategory, noticePriority, noticeDescription, noticerImage } = req.body;

    const newNotice = new Notices({
        noticeBy: noticeFrom,
        school: req.headers["x-school-id"],
        noticeTitle: noticeTitle,
        noticeTo: noticeFor,
        noticeCategory: noticeCategory,
        priority: noticePriority,
        noticeDescription: noticeDescription,
        noticerImage: noticerImage
    });
    await newNotice.save();

    if (!newNotice) {
        return next(new ErrorHandler("Failed to create notice.", 404));
    }

    res.status(201).json({
        success: true,
        message: "Notice created successfully.",
        data: newNotice
    });
});

//read all notices for a school
exports.getAllNotices = catchAsyncErrors(async (req, res, next) => {
    const allNotices = await Notices.find({ school: req.headers["x-school-id"] }).sort({ "updatedAt": -1 });

    if (!allNotices) {
        return next(new ErrorHandler("Failed to fetch notices.", 404));
    }

    res.status(200).json({
        success: true,
        message: "All notices read successfully.",
        data: allNotices
    });
});

//update notice
exports.updateNotice = catchAsyncErrors(async (req, res, next) => {
    const { noticeFrom, noticeTitle, noticeFor, noticeCategory, noticePriority, noticeDescription, noticerImage } = req.body;
    const { id } = req.params;

    const notice = await Notices.findByIdAndUpdate(
        id,
        {
            noticeBy: noticeFrom,
            noticeTitle: noticeTitle,
            noticeTo: noticeFor,
            noticeCategory: noticeCategory,
            priority: noticePriority,
            noticeDescription: noticeDescription,
            noticerImage: noticerImage
        },
        { new: true }
    );

    if (!notice) {
        return next(new ErrorHandler("Notice not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Notice updated successfully",
        data: notice
    });
});

//delete notice
exports.deleteNotice = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const deleteNotice = await Notices.findByIdAndRemove(id);

    if (!deleteNotice) {
        return next(new ErrorHandler("Noice not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Notice deleted.",
        data: deleteNotice
    });
});

//your notices
exports.getYourNotices = catchAsyncErrors(async (req, res, next) => {
    const { noticeFrom } = req.params;

    const allNotices = await Notices.find({ school: req.headers["x-school-id"], noticeBy: noticeFrom }).sort({ "updatedAt": -1 });

    if (!allNotices) {
        return next(new ErrorHandler("Not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "All notices read successfully.",
        data: allNotices
    });
});

//get notices by role
exports.getNoticesByRole = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.params;

    let noticesByRoles;

    if (role === "school-account") {
        //show all
        noticesByRoles = await Notices.find({ school: req.headers["x-school-id"] }).sort({ "updatedAt": -1 });
    }
    else {
        //show for logged in role
        noticesByRoles = await Notices.find({ school: req.headers["x-school-id"], noticeTo: { $in: [role, "everyone"] } }).sort({ "updatedAt": -1 });
    }

    if (!noticesByRoles) {
        return next(new ErrorHandler("Not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "All notices read successfully.",
        data: noticesByRoles
    });

})