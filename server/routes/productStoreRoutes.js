const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/productStoreController");

router.route("/productStore/create").post(upload.none(), createRecord);
router.route("/productStore/:id").get(upload.none(), getSingleRecord);
router.route("/productStore/get-all").post(upload.none(), getAllRecord);
router.route("/productStore/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/productStore/update/:id").patch(upload.none(), updateRecord);
router.route("/productStore/:id").delete(upload.none(), deleteRecord);

module.exports = router;
