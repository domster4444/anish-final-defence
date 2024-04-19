const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/incidentController");

router.route("/incident/create").post(upload.none(), createRecord);
router.route("/incident/:id").get(upload.none(), getSingleRecord);
router.route("/incident/get-all").post(upload.none(), getAllRecord);
router.route("/incident/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/incident/update/:id").patch(upload.none(), updateRecord);
router.route("/incident/:id").delete(upload.none(), deleteRecord);

module.exports = router;
