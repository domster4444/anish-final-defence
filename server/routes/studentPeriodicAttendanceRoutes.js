const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/studentPeriodicAttendanceController");

router.route("/studentPeriodicAttendance/create").post(upload.none(), createRecord);
router.route("/studentPeriodicAttendance/:id").get(upload.none(), getSingleRecord);
router.route("/studentPeriodicAttendance/get-all").post(upload.none(), getAllRecord);
router.route("/studentPeriodicAttendance/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/studentPeriodicAttendance/update/:id").patch(upload.none(), updateRecord);
router.route("/studentPeriodicAttendance/:id").delete(upload.none(), deleteRecord);

module.exports = router;
