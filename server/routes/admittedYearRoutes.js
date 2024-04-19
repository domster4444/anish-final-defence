const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/admittedYearController");

router.route("/admittedYear/create").post(upload.none(), createRecord);
router.route("/admittedYear/:id").get(upload.none(), getSingleRecord);
router.route("/admittedYear/get-all").post(upload.none(), getAllRecord);
router.route("/admittedYear/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/admittedYear/update/:id").patch(upload.none(), updateRecord);
router.route("/admittedYear/:id").delete(upload.none(), deleteRecord);

module.exports = router;
