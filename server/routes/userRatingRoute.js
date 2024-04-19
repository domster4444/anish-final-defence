const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/userRatingController");

router.route("/userRating/create").post(upload.none(), createRecord);
router.route("/userRating/:id").get(upload.none(), getSingleRecord);
router.route("/userRating/get-all").post(upload.none(), getAllRecord);
router.route("/userRating/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/userRating/update/:id").patch(upload.none(), updateRecord);
router.route("/userRating/:id").delete(upload.none(), deleteRecord);

module.exports = router;
