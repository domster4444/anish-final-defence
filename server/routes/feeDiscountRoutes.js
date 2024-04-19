const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/feeDiscountController");

router.route("/feeDiscount/create").post(upload.none(), createRecord);
router.route("/feeDiscount/:id").get(upload.none(), getSingleRecord);
router.route("/feeDiscount/get-all").post(upload.none(), getAllRecord);
router.route("/feeDiscount/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/feeDiscount/update/:id").patch(upload.none(), updateRecord);
router.route("/feeDiscount/:id").delete(upload.none(), deleteRecord);

module.exports = router;
