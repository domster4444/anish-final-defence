const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/admissionEnquiryController");

router.route("/admissionEnquiry/create").post(upload.none(), createRecord);
router.route("/admissionEnquiry/:id").get(upload.none(), getSingleRecord);
router.route("/admissionEnquiry/get-all").post(upload.none(), getAllRecord);
router.route("/admissionEnquiry/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/admissionEnquiry/update/:id").patch(upload.none(), updateRecord);
router.route("/admissionEnquiry/:id").delete(upload.none(), deleteRecord);

module.exports = router;
