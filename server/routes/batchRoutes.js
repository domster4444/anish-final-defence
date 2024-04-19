const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/batchController");

router.route("/batch/create").post(upload.none(), createRecord);
router.route("/batch/:id").get(upload.none(), getSingleRecord);
router.route("/batch/get-all").post(upload.none(), getAllRecord);
router.route("/batch/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/batch/update/:id").patch(upload.none(), updateRecord);
router.route("/batch/:id").delete(upload.none(), deleteRecord);

module.exports = router;
