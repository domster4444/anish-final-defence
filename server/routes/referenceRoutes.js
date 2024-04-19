const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/referenceController");

router.route("/reference/create").post(upload.none(), createRecord);
router.route("/reference/:id").get(upload.none(), getSingleRecord);
router.route("/reference/get-all").post(upload.none(), getAllRecord);
router.route("/reference/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/reference/update/:id").patch(upload.none(), updateRecord);
router.route("/reference/:id").delete(upload.none(), deleteRecord);

module.exports = router;
