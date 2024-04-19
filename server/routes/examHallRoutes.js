const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/examHallController");

router.route("/examHall/create").post(upload.none(), createRecord);
router.route("/examHall/:id").get(upload.none(), getSingleRecord);
router.route("/examHall/get-all").post(upload.none(), getAllRecord);
router.route("/examHall/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/examHall/update/:id").patch(upload.none(), updateRecord);
router.route("/examHall/:id").delete(upload.none(), deleteRecord);

module.exports = router;
