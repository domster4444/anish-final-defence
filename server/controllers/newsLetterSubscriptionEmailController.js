const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { sendNewsLetterEmail } = require("../utils/SESEmailer");

exports.sendNewsLetterSubscriptionEmail = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Please enter your email", 400));
  }

  // check if email is valid
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) {
    return next(new ErrorHandler("Please enter a valid email", 400));
  }

  const emailStatus = await sendNewsLetterEmail(email);

  if (!emailStatus) {
    return next(new ErrorHandler("Email could not be sent", 500));
  }

  res.status(201).json({
    success: true,
    message: "subscription email has been sent",
  });
});
