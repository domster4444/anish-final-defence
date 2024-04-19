const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/reviewProductController");

router.route("/reviewProduct/create").post(upload.single("coverImage"), createRecord);
router.route("/reviewProduct/get/:id").get(getSingleRecord);
router.route("/reviewProduct/get-all").get(getAllRecord);
router.route("/reviewProduct/update/:id").patch(upload.single("coverImage"), updateRecord);
router.route("/reviewProduct/delete/:id").delete(upload.none(), deleteRecord);
router.route("/reviewProduct/get-all-for-school").post(upload.none(), getAllRecordForSchool);

module.exports = router;
