const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/incomeHeadController");

router.route("/incomeHead/create").post(upload.none(), createRecord);
router.route("/incomeHead/:id").get(upload.none(), getSingleRecord);
router.route("/incomeHead/get-all").post(upload.none(), getAllRecord);
router.route("/incomeHead/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/incomeHead/update/:id").patch(upload.none(), updateRecord);
router.route("/incomeHead/:id").delete(upload.none(), deleteRecord);

module.exports = router;
