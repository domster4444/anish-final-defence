const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { getAllRecordForSchoolWithType, createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/bookFineController");

router.route("/bookFine/create").post(upload.none(), createRecord);
router.route("/bookFine/:id").get(upload.none(), getSingleRecord);
router.route("/bookFine/get-all").post(upload.none(), getAllRecord);
router.route("/bookFine/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/bookFine/update/:id").patch(upload.none(), updateRecord);
router.route("/bookFine/:id").delete(upload.none(), deleteRecord);
router.route("/bookFine/get-by-type/:type").post(upload.none(), getAllRecordForSchoolWithType);

module.exports = router;
