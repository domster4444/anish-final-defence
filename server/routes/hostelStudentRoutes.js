const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/hostelStudentController");

router.route("/hostelStudent/create").post(upload.none(), createRecord);
router.route("/hostelStudent/:id").get(upload.none(), getSingleRecord);
router.route("/hostelStudent/get-all").post(upload.none(), getAllRecord);
router.route("/hostelStudent/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/hostelStudent/update/:id").patch(upload.none(), updateRecord);
router.route("/hostelStudent/:id").delete(upload.none(), deleteRecord);

module.exports = router;
