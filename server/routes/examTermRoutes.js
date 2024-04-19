const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/examTermController");

router.route("/examTerm/create").post(upload.none(), createRecord);
router.route("/examTerm/:id").get(upload.none(), getSingleRecord);
router.route("/examTerm/get-all").post(upload.none(), getAllRecord);
router.route("/examTerm/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/examTerm/update/:id").patch(upload.none(), updateRecord);
router.route("/examTerm/:id").delete(upload.none(), deleteRecord);

module.exports = router;
