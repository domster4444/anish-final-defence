const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/streamController");

router.route("/stream/create").post(upload.none(), createRecord);
router.route("/stream/:id").get(upload.none(), getSingleRecord);
router.route("/stream/get-all").post(upload.none(), getAllRecord);
router.route("/stream/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/stream/update/:id").patch(upload.none(), updateRecord);
router.route("/stream/:id").delete(upload.none(), deleteRecord);

module.exports = router;
