const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/expenseController");

router.route("/expense/create").post(upload.single("attachedDocumentName"), createRecord);
router.route("/expense/:id").get(upload.none(), getSingleRecord);
router.route("/expense/get-all").post(upload.none(), getAllRecord);
router.route("/expense/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/expense/update/:id").patch(upload.single("attachedDocumentName"), updateRecord);
router.route("/expense/:id").delete(upload.none(), deleteRecord);

module.exports = router;
