const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/feeGroupController");

router.route("/feeGroup/create").post(upload.none(), createRecord);
router.route("/feeGroup/:id").get(upload.none(), getSingleRecord);
router.route("/feeGroup/get-all").post(upload.none(), getAllRecord);
router.route("/feeGroup/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/feeGroup/update/:id").patch(upload.none(), updateRecord);
router.route("/feeGroup/:id").delete(upload.none(), deleteRecord);

module.exports = router;
