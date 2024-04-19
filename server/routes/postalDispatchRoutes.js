const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/postalDispatchController");

router.route("/postalDispatch/create").post(upload.single("coverImage"), createRecord);
router.route("/postalDispatch/get/:id").get(getSingleRecord);
router.route("/postalDispatch/get-all").get(getAllRecord);
router.route("/postalDispatch/update/:id").patch(upload.single("coverImage"), updateRecord);
router.route("/postalDispatch/delete/:id").delete(upload.none(), deleteRecord);
router.route("/postalDispatch/get-all-for-school").post(upload.none(), getAllRecordForSchool);

module.exports = router;
