const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/liveClassMeetingController");

router.route("/liveClassMeeting/create").post(upload.none(), createRecord);
router.route("/liveClassMeeting/:id").get(upload.none(), getSingleRecord);
router.route("/liveClassMeeting/get-all").post(upload.none(), getAllRecord);
router.route("/liveClassMeeting/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/liveClassMeeting/update/:id").patch(upload.none(), updateRecord);
router.route("/liveClassMeeting/:id").delete(upload.none(), deleteRecord);

module.exports = router;
