//? config app
const express = require("express");
const compression = require("compression");
const fs = require("fs");
const app = express();
const multer = require("multer");
const winston = require("winston");
const path = require("path");

app.use(
  compression({
    level: 6,
    threshold: 100 * 1000, // dont compress if above 100kb

    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        // don't compress responses with this request header
        return false;
      }
      // fallback to standard filter function
      return compression.filter(req, res);
    },
  })
);

global.appRoot = path.dirname(__filename);
app.use(express.static(path.join(appRoot, "storage")));

const upload = multer();

//? Configure Winston logger
const logger = winston.createLogger({
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: "app.log" })],
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
});

app.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
});

//?config dotenv file
const dotenv = require("dotenv");
dotenv.config({ path: "./configs/config.env" });

//?config cors
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
  })
);
//?connect to db
const connectDB = require("./configs/database");
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

//?config cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//?config body-parser
app.use(express.json({ limit: "50mb" })); //? allow body parsing to be up to 50mb
app.use(express.urlencoded({ extended: true, limit: "50mb" })); //? allow body parsing to be up to 50mb

//?config morgan
const morgan = require("morgan");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//todo: routes imports
const authRoutes = require("./routes/authRoutes");
const schoolRoutes = require("./routes/schoolRoutes");
const classRoutes = require("./routes/classRoutes");
const sectionRoutes = require("./routes/sectionRoutes");

const subjectRoutes = require("./routes/subjectRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowedBookRoutes = require("./routes/borrowedBookRoutes");
const bookCategoryRoutes = require("./routes/bookCategoryRoutes");
const librarySettingRoutes = require("./routes/librarySettingRoutes");
const bookFineRoutes = require("./routes/bookFineRoutes");
const newsLetterSubscriptionEmailRoutes = require("./routes/newsLetterSubscriptionEmailRoutes");
const contactUsEmailRoutes = require("./routes/contactUsEmailRoutes");
const emailQuotaRoutes = require("./routes/emailQuotaRoutes");
const streamRoutes = require("./routes/streamRoutes");
const incomeHeadRoutes = require("./routes/incomeHeadRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseHeadRoutes = require("./routes/expenseHeadRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const examHallRoutes = require("./routes/examHallRoutes");
const examTermRoutes = require("./routes/examTermRoutes");
const admitCardDesignRoutes = require("./routes/admitCardDesignRoutes");
// gallery
const galleryRoutes = require("./routes/galleryRoutes");
// hostel start
const hostelRoomTypeRoutes = require("./routes/hostelRoomTypeRoutes");
const hostelRoutes = require("./routes/hostelRoutes");
const hostelRoomRoutes = require("./routes/hostelRoomRoutes");
const hostelStudentRoutes = require("./routes/hostelStudentRoutes");
const hostelStudentFeesRoutes = require("./routes/hostelStudentFeesRoutes");
// inventory
const productCategoryRoutes = require("./routes/productCategoryRoutes");
const productStoreRoutes = require("./routes/productStoreRoutes");
const productSupplierRoutes = require("./routes/productSupplierRoutes");
const employeeDepartmentRoutes = require("./routes/employeeDepartmentRoutes");
const employeeDesignationRoutes = require("./routes/employeeDesignationRoutes");
const batchRoutes = require("./routes/batchRoutes");
const admittedYearRoutes = require("./routes/admittedYearRoutes");
const eventCalendarRoutes = require("./routes/eventCalendarRoutes");
// canteen
const canteenItemRoutes = require("./routes/canteenItemRoutes");
const canteenItemOrderRoutes = require("./routes/canteenItemOrderRoutes");
// transportation
const vehicleRouteRoutes = require("./routes/vehicleRouteRoutes");
//attendance
const studentOneTimeAttendanceRoutes = require("./routes/studentOneTimeAttendanceRoutes");
const studentPeriodicAttendanceRoutes = require("./routes/studentPeriodicAttendanceRoutes");
const idCardDesignRoutes = require("./routes/idCardDesignRoutes");
//notice management
const noticeRoutes = require("./routes/noticeRoutes");
const noticeCategoryRoutes = require("./routes/noticeCategoryRoutes");
// behavioural management
const incidentRoutes = require("./routes/incidentRoutes");
const assignIncidentRoutes = require("./routes/assignIncidentRoutes");

// front desk
const purposeRoutes = require("./routes/purposeRoutes");
const complaintTypeRoutes = require("./routes/complaintTypeRoutes");
const referenceRoutes = require("./routes/referenceRoutes");
const sourceRoutes = require("./routes/sourceRoutes");
const phoneCallLogRoutes = require("./routes/phoneCallLogRoutes");
const admissionEnquiryRoutes = require("./routes/admissionEnquiryRoutes");
const enquiryFollowUpRoutes = require("./routes/enquiryFollowUpRoutes");
const complainRoutes = require("./routes/complainRoutes");
const visitorBookRoutes = require("./routes/visitorBookRoutes");
const postalReceiveRoutes = require("./routes/postalReceiveRoutes");
const postalDispatchRoutes = require("./routes/postalDispatchRoutes");
// achievement certificate
const achievementCertificateDesignRoutes = require("./routes/achievementCertificateDesignRoutes");
//assignment
const assignmentRoutes = require("./routes/assignmentRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
// class time table
const classTimeTableRoutes = require("./routes/classTimeTableRoutes");
// live teacher meeting
const liveEmployeeMeetingRoutes = require("./routes/liveEmployeeMeetingRoutes");
const liveClassMeetingRoutes = require("./routes/liveClassMeetingRoutes");
const liveClassRoutes = require("./routes/liveClassRoutes");
//fees
const feeGroupRoutes = require("./routes/feeGroupRoutes");
const feeDiscountRoutes = require("./routes/feeDiscountRoutes");
const feeTypeRoutes = require("./routes/feeTypeRoutes");
const feeMasterRoutes = require("./routes/feeMasterRoutes");

//event
const eventRoutes = require("./routes/eventRoutes");

//admin only
const postRoutes = require("./routes/postRoutes");
const studentAchievementRoutes = require("./routes/studentAchievementRoutes");
//! ANISH ROUTES
const reviewCategoryRoutes = require("./routes/reviewCategoryRoutes");
const reviewProductRoute = require("./routes/reviewProductRoute");
const userRatingRoute = require("./routes/userRatingRoute");

app.use("/storage", express.static(path.join(appRoot, "storage")));

//* Download any file from storage folder
//? example request http://localhost:5000/storage/download/11/1702166207533.JPG
app.get("/storage/download/:folder/:filename", (req, res) => {
  const { folder, filename } = req.params;
  const filePath = path.join(appRoot, `storage/${folder}`, filename);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.end(data);
  });
});

app.use("/api/v1", authRoutes);
app.use("/api/v1", schoolRoutes);
app.use("/api/v1", galleryRoutes);
app.use("/api/v1", classRoutes);
app.use("/api/v1", sectionRoutes);
app.use("/api/v1", hostelRoomTypeRoutes);
app.use("/api/v1", hostelRoutes);
app.use("/api/v1", hostelStudentRoutes);
app.use("/api/v1", hostelStudentFeesRoutes);
app.use("/api/v1", hostelRoomRoutes);
app.use("/api/v1", subjectRoutes);
app.use("/api/v1", bookRoutes);
app.use("/api/v1", bookCategoryRoutes);
app.use("/api/v1", librarySettingRoutes);
app.use("/api/v1", bookFineRoutes);
app.use("/api/v1", newsLetterSubscriptionEmailRoutes);
app.use("/api/v1", contactUsEmailRoutes);
app.use("/api/v1", emailQuotaRoutes);
app.use("/api/v1", streamRoutes);
app.use("/api/v1", incomeHeadRoutes);
app.use("/api/v1", incomeRoutes);
app.use("/api/v1", expenseHeadRoutes);
app.use("/api/v1", expenseRoutes);
app.use("/api/v1", examHallRoutes);
app.use("/api/v1", examTermRoutes);
app.use("/api/v1", productCategoryRoutes);
app.use("/api/v1", productStoreRoutes);
app.use("/api/v1", productSupplierRoutes);
app.use("/api/v1", employeeDepartmentRoutes);
app.use("/api/v1", employeeDesignationRoutes);
app.use("/api/v1", batchRoutes);
app.use("/api/v1", admittedYearRoutes);
app.use("/api/v1", eventCalendarRoutes);
app.use("/api/v1", canteenItemRoutes);
app.use("/api/v1", canteenItemOrderRoutes);
app.use("/api/v1", vehicleRouteRoutes);
app.use("/api/v1", studentOneTimeAttendanceRoutes);
app.use("/api/v1", idCardDesignRoutes);
app.use("/api/v1", noticeRoutes);
app.use("/api/v1", noticeCategoryRoutes);
app.use("/api/v1", incidentRoutes);
app.use("/api/v1", assignIncidentRoutes);
app.use("/api/v1", borrowedBookRoutes);
app.use("/api/v1", purposeRoutes);
app.use("/api/v1", complaintTypeRoutes);
app.use("/api/v1", referenceRoutes);
app.use("/api/v1", sourceRoutes);
app.use("/api/v1", phoneCallLogRoutes);
app.use("/api/v1", admissionEnquiryRoutes);
app.use("/api/v1", enquiryFollowUpRoutes);
app.use("/api/v1", complainRoutes);
app.use("/api/v1", visitorBookRoutes);
app.use("/api/v1", postalReceiveRoutes);
app.use("/api/v1", postalDispatchRoutes);
app.use("/api/v1", admitCardDesignRoutes);
app.use("/api/v1", achievementCertificateDesignRoutes);
app.use("/api/v1", assignmentRoutes);
app.use("/api/v1", submissionRoutes);
app.use("/api/v1", studentPeriodicAttendanceRoutes);
app.use("/api/v1", classTimeTableRoutes);
app.use("/api/v1", liveEmployeeMeetingRoutes);
app.use("/api/v1", liveClassMeetingRoutes);
app.use("/api/v1", liveClassRoutes);
app.use("/api/v1", feeGroupRoutes);
app.use("/api/v1", feeDiscountRoutes);
app.use("/api/v1", feeTypeRoutes);
app.use("/api/v1", feeMasterRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", eventRoutes);
app.use("/api/v1", studentAchievementRoutes);
app.use("/api/v1", reviewCategoryRoutes);
app.use("/api/v1", reviewProductRoute);
app.use("/api/v1", userRatingRoute);

//* get file array buffer after reading it  from storage folder (used in id card generation)
app.get("/storage/:foldername/:filename", (req, res) => {
  console.log("route has been hit");

  const { foldername, filename } = req.params;
  const filePath = path.join(appRoot, `storage/${foldername}`, filename);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.end(data);
  });
});
// especially below api is for id card font buffer
app.get("/storage/:filename", (req, res) => {
  console.log("route has been hit");
  const { filename } = req.params;
  const filePath = path.join(appRoot, "storage/11", filename);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.end(data);
  });
});

//* get file array buffer after reading it  from storage folder (used in id card generation)
app.get("/storage/:schoolFolderName/:filename", (req, res) => {
  const { schoolFolderName, filename } = req.params;
  const filePath = path.join(appRoot, `storage/${schoolFolderName}`, filename);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.end(data);
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server working fine",
  });
});

//?config globalErrorMiddleware
const globalErrorMiddleware = require("./middlewares/globalErrorMiddleware");
app.use(globalErrorMiddleware);

module.exports = app;
