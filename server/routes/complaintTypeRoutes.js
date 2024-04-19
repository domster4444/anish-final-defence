const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/complaintTypeController");

router.route("/complaintType/create").post(upload.none(), createRecord);
router.route("/complaintType/:id").get(upload.none(), getSingleRecord);
router.route("/complaintType/get-all").post(upload.none(), getAllRecord);
router.route("/complaintType/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/complaintType/update/:id").patch(upload.none(), updateRecord);
router.route("/complaintType/:id").delete(upload.none(), deleteRecord);

module.exports = router;
