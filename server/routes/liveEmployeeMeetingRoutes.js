const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/liveEmployeeMeetingController");

router.route("/liveEmployeeMeeting/create").post(upload.none(), createRecord);
router.route("/liveEmployeeMeeting/:id").get(upload.none(), getSingleRecord);
router.route("/liveEmployeeMeeting/get-all").post(upload.none(), getAllRecord);
router.route("/liveEmployeeMeeting/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/liveEmployeeMeeting/update/:id").patch(upload.none(), updateRecord);
router.route("/liveEmployeeMeeting/:id").delete(upload.none(), deleteRecord);

module.exports = router;
