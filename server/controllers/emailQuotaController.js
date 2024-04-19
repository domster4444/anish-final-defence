const EmailQuota = require("../models/emailQuotaModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createEmailQuota = catchAsyncErrors(async (req, res, next) => {
  const emailQuota = new EmailQuota({
    noOfEmailSent: 0,
  });

  await emailQuota.save();

  res.status(201).json({
    success: true,
    message: "Email quota count for all school created successfully",
    data: emailQuota,
  });
});

exports.increaseEmailQuota = catchAsyncErrors(async (req, res, next) => {
  const { noOfRecipient } = req.body;

  const emailQuota = await EmailQuota.findById("6561ff5b2514653661135729");

  if (!emailQuota) {
    return next(new ErrorHandler("Email quota not found", 404));
  }

  emailQuota.noOfEmailSent = parseInt(emailQuota.noOfEmailSent) + parseInt(noOfRecipient);

  await emailQuota.save();

  res.status(200).json({
    success: true,
    message: "Email quota count increased successfully",
  });
});

// Get total email quota count
exports.getTotalEmailQuota = catchAsyncErrors(async (req, res, next) => {
  const emailQuota = await EmailQuota.findById("6561ff5b2514653661135729");

  if (!emailQuota) {
    return next(new ErrorHandler("Email quota not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Email quota count fetched successfully",
    emailQuota,
  });
});

// check if email is under 500 limit, if yes then return true else false
exports.isEmailLimitExceeded = catchAsyncErrors(async (req, res, next) => {
  const emailQuota = await EmailQuota.findById("6561ff5b2514653661135729");

  if (!emailQuota) {
    return next(new ErrorHandler("Email quota not found", 404));
  }

  if (emailQuota.noOfEmailSent >= 500) {
    return res.status(200).json({
      success: true,
      isEmailLimitExceeded: true,
      message: "Email quota limit exceeded",
    });
  }

  res.status(200).json({
    success: true,
    isEmailLimitExceeded: false,
    message: "Email quota limit not exceeded, allow to send more emails",
  });
});
