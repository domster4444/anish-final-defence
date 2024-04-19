const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/canteenItemController");

router.route("/canteenItem/create").post(upload.single("coverImage"), createRecord);
router.route("/canteenItem/get/:id").get(getSingleRecord);
router.route("/canteenItem/get-all").get(getAllRecord);
router.route("/canteenItem/update/:id").patch(upload.single("coverImage"), updateRecord);
router.route("/canteenItem/delete/:id").delete(upload.none(), deleteRecord);
router.route("/canteenItem/get-all-for-school").post(upload.none(), getAllRecordForSchool);

module.exports = router;
