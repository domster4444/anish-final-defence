const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/studentOneTimeAttendanceController");

router.route("/studentOneTimeAttendance/create").post(upload.none(), createRecord);
router.route("/studentOneTimeAttendance/:id").get(upload.none(), getSingleRecord);
router.route("/studentOneTimeAttendance/get-all").post(upload.none(), getAllRecord);
router.route("/studentOneTimeAttendance/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/studentOneTimeAttendance/update/:id").patch(upload.none(), updateRecord);
router.route("/studentOneTimeAttendance/:id").delete(upload.none(), deleteRecord);

module.exports = router;
