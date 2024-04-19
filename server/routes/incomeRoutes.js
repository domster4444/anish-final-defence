const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/incomeController");

router.route("/income/create").post(upload.single("attachedDocumentName"), createRecord);
router.route("/income/:id").get(upload.none(), getSingleRecord);
router.route("/income/get-all").post(upload.none(), getAllRecord);
router.route("/income/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/income/update/:id").patch(upload.single("attachedDocumentName"), updateRecord);
router.route("/income/:id").delete(upload.none(), deleteRecord);

module.exports = router;
