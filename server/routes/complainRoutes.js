const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/complainController");

router.route("/complain/create").post(upload.none(), createRecord);
router.route("/complain/:id").get(upload.none(), getSingleRecord);
router.route("/complain/get-all").post(upload.none(), getAllRecord);
router.route("/complain/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/complain/update/:id").patch(upload.none(), updateRecord);
router.route("/complain/:id").delete(upload.none(), deleteRecord);

module.exports = router;
