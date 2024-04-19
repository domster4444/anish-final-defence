const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { getAllRecordForStudent, createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/hostelStudentFeesController");

router.route("/hostelStudentFees/create").post(upload.none(), createRecord);
router.route("/hostelStudentFees/:id").get(upload.none(), getSingleRecord);
router.route("/hostelStudentFees/get-all-for-student/:studentId").get(upload.none(), getAllRecordForStudent);
router.route("/hostelStudentFees/get-all").post(upload.none(), getAllRecord);
router.route("/hostelStudentFees/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/hostelStudentFees/update/:id").patch(upload.none(), updateRecord);
router.route("/hostelStudentFees/:id").delete(upload.none(), deleteRecord);

module.exports = router;
