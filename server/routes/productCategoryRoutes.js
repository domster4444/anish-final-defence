const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/productCategoryController");

router.route("/productCategory/create").post(upload.none(), createRecord);
router.route("/productCategory/:id").get(upload.none(), getSingleRecord);
router.route("/productCategory/get-all").post(upload.none(), getAllRecord);
router.route("/productCategory/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/productCategory/update/:id").patch(upload.none(), updateRecord);
router.route("/productCategory/:id").delete(upload.none(), deleteRecord);

module.exports = router;
