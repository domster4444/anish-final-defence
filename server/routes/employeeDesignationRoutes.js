const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/employeeDesignationController");

router.route("/employeeDesignation/create").post(upload.none(), createRecord);
router.route("/employeeDesignation/:id").get(upload.none(), getSingleRecord);
router.route("/employeeDesignation/get-all").post(upload.none(), getAllRecord);
router.route("/employeeDesignation/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/employeeDesignation/update/:id").patch(upload.none(), updateRecord);
router.route("/employeeDesignation/:id").delete(upload.none(), deleteRecord);

module.exports = router;
