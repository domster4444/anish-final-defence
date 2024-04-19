const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/visitorBookController");

router.route("/visitorBook/create").post(upload.none(), createRecord);
router.route("/visitorBook/:id").get(upload.none(), getSingleRecord);
router.route("/visitorBook/get-all").post(upload.none(), getAllRecord);
router.route("/visitorBook/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/visitorBook/update/:id").patch(upload.none(), updateRecord);
router.route("/visitorBook/:id").delete(upload.none(), deleteRecord);

module.exports = router;
