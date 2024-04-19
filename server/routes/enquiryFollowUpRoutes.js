const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/enquiryFollowUpController");

router.route("/enquiryFollowUp/create").post(upload.none(), createRecord);
router.route("/enquiryFollowUp/:id").get(upload.none(), getSingleRecord);
router.route("/enquiryFollowUp/get-all").post(upload.none(), getAllRecord);
router.route("/enquiryFollowUp/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/enquiryFollowUp/update/:id").patch(upload.none(), updateRecord);
router.route("/enquiryFollowUp/:id").delete(upload.none(), deleteRecord);

module.exports = router;
