const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { getStats, createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/hostelController");

router.route("/hostel/create").post(upload.none(), createRecord);
router.route("/hostel/:id").get(upload.none(), getSingleRecord);
router.route("/hostel/get-hostel-stats/:hostelId").get(upload.none(), getStats);
router.route("/hostel/get-all").post(upload.none(), getAllRecord);
router.route("/hostel/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/hostel/update/:id").patch(upload.none(), updateRecord);
router.route("/hostel/:id").delete(upload.none(), deleteRecord);

module.exports = router;
