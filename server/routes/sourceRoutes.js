const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/sourceController");

router.route("/source/create").post(upload.none(), createRecord);
router.route("/source/:id").get(upload.none(), getSingleRecord);
router.route("/source/get-all").post(upload.none(), getAllRecord);
router.route("/source/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/source/update/:id").patch(upload.none(), updateRecord);
router.route("/source/:id").delete(upload.none(), deleteRecord);

module.exports = router;
