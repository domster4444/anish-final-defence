const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/productSupplierController");

router.route("/productSupplier/create").post(upload.none(), createRecord);
router.route("/productSupplier/:id").get(upload.none(), getSingleRecord);
router.route("/productSupplier/get-all").post(upload.none(), getAllRecord);
router.route("/productSupplier/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/productSupplier/update/:id").patch(upload.none(), updateRecord);
router.route("/productSupplier/:id").delete(upload.none(), deleteRecord);

module.exports = router;
