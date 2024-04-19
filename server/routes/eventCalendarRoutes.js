const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord, bulkUploadRecord } = require("../controllers/eventCalendarController");

router.route("/eventCalendar/create").post(upload.none(), createRecord);
router.route("/eventCalendar/:id").get(upload.none(), getSingleRecord);
router.route("/eventCalendar/get-all").post(upload.none(), getAllRecord);
router.route("/eventCalendar/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/eventCalendar/update/:id").patch(upload.none(), updateRecord);
router.route("/eventCalendar/:id").delete(upload.none(), deleteRecord);
router.route("/eventCalendar/bulk-upload").post(upload.single("excelFile"), bulkUploadRecord);

module.exports = router;
