const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { sendContactUsEmail } = require("../utils/SESEmailer");

exports.sendContactUsQueryEmail = catchAsyncErrors(async (req, res, next) => {
  const { email, subject, message } = req.body;

  if (!email) {
    return next(new ErrorHandler("Please enter your email", 400));
  }

  if (!subject) {
    return next(new ErrorHandler("Please enter your subject", 400));
  }

  if (!message) {
    return next(new ErrorHandler("Please enter your message", 400));
  }

  // check if email is valid
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) {
    return next(new ErrorHandler("Please enter a valid email", 400));
  }

  const emailStatus = await sendContactUsEmail(email, subject, message);

  if (!emailStatus) {
    return next(new ErrorHandler("Email could not be sent", 500));
  }

  res.status(201).json({
    success: true,
    message: "Your query has been sent successfully.",
  });
});
