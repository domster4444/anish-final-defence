const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/phoneCallLogController");

router.route("/phoneCallLog/create").post(upload.none(), createRecord);
router.route("/phoneCallLog/:id").get(upload.none(), getSingleRecord);
router.route("/phoneCallLog/get-all").post(upload.none(), getAllRecord);
router.route("/phoneCallLog/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/phoneCallLog/update/:id").patch(upload.none(), updateRecord);
router.route("/phoneCallLog/:id").delete(upload.none(), deleteRecord);

module.exports = router;
