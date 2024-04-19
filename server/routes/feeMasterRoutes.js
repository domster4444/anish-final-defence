const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/feeMasterController");

router.route("/feeMaster/create").post(upload.none(), createRecord);
router.route("/feeMaster/:id").get(upload.none(), getSingleRecord);
router.route("/feeMaster/get-all").post(upload.none(), getAllRecord);
router.route("/feeMaster/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/feeMaster/update/:id").patch(upload.none(), updateRecord);
router.route("/feeMaster/:id").delete(upload.none(), deleteRecord);

module.exports = router;
