const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/liveClassController");

router.route("/liveClass/create").post(upload.none(), createRecord);
router.route("/liveClass/:id").get(upload.none(), getSingleRecord);
router.route("/liveClass/get-all").post(upload.none(), getAllRecord);
router.route("/liveClass/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/liveClass/update/:id").patch(upload.none(), updateRecord);
router.route("/liveClass/:id").delete(upload.none(), deleteRecord);

module.exports = router;
