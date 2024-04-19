const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/postalReceiveController");

router.route("/postalReceive/create").post(upload.single("coverImage"), createRecord);
router.route("/postalReceive/get/:id").get(getSingleRecord);
router.route("/postalReceive/get-all").get(getAllRecord);
router.route("/postalReceive/update/:id").patch(upload.single("coverImage"), updateRecord);
router.route("/postalReceive/delete/:id").delete(upload.none(), deleteRecord);
router.route("/postalReceive/get-all-for-school").post(upload.none(), getAllRecordForSchool);

module.exports = router;
