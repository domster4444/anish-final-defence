const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/purposeController");

router.route("/purpose/create").post(upload.none(), createRecord);
router.route("/purpose/:id").get(upload.none(), getSingleRecord);
router.route("/purpose/get-all").post(upload.none(), getAllRecord);
router.route("/purpose/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/purpose/update/:id").patch(upload.none(), updateRecord);
router.route("/purpose/:id").delete(upload.none(), deleteRecord);

module.exports = router;
