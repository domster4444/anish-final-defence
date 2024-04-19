const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/vehicleController");

router.route("/vehicle/create").post(upload.single("coverImage"), createRecord);
router.route("/vehicle/get/:id").get(getSingleRecord);
router.route("/vehicle/get-all").get(getAllRecord);
router.route("/vehicle/update/:id").patch(upload.single("coverImage"), updateRecord);
router.route("/vehicle/delete/:id").delete(upload.none(), deleteRecord);
router.route("/vehicle/get-all-for-school").post(upload.none(), getAllRecordForSchool);

module.exports = router;
