const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/reviewCategoryController");

router.route("/reviewCategory/create").post(upload.none(), createRecord);
router.route("/reviewCategory/:id").get(upload.none(), getSingleRecord);
router.route("/reviewCategory/get-all").post(upload.none(), getAllRecord);
router.route("/reviewCategory/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/reviewCategory/update/:id").patch(upload.none(), updateRecord);
router.route("/reviewCategory/:id").delete(upload.none(), deleteRecord);

module.exports = router;
