const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/expenseHeadController");

router.route("/expenseHead/create").post(upload.none(), createRecord);
router.route("/expenseHead/:id").get(upload.none(), getSingleRecord);
router.route("/expenseHead/get-all").post(upload.none(), getAllRecord);
router.route("/expenseHead/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/expenseHead/update/:id").patch(upload.none(), updateRecord);
router.route("/expenseHead/:id").delete(upload.none(), deleteRecord);

module.exports = router;
