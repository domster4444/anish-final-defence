const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/feeTypeController");

router.route("/feeType/create").post(upload.none(), createRecord);
router.route("/feeType/:id").get(upload.none(), getSingleRecord);
router.route("/feeType/get-all").post(upload.none(), getAllRecord);
router.route("/feeType/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/feeType/update/:id").patch(upload.none(), updateRecord);
router.route("/feeType/:id").delete(upload.none(), deleteRecord);

module.exports = router;
