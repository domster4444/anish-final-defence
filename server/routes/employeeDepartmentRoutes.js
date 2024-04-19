const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/employeeDepartmentController");

router.route("/employeeDepartment/create").post(upload.none(), createRecord);
router.route("/employeeDepartment/:id").get(upload.none(), getSingleRecord);
router.route("/employeeDepartment/get-all").post(upload.none(), getAllRecord);
router.route("/employeeDepartment/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/employeeDepartment/update/:id").patch(upload.none(), updateRecord);
router.route("/employeeDepartment/:id").delete(upload.none(), deleteRecord);

module.exports = router;
