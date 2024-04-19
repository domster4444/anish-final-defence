const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/hostelRoomTypeController");

router.route("/hostelRoomType/create").post(upload.none(), createRecord);
router.route("/hostelRoomType/:id").get(upload.none(), getSingleRecord);
router.route("/hostelRoomType/get-all").post(upload.none(), getAllRecord);
router.route("/hostelRoomType/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/hostelRoomType/update/:id").patch(upload.none(), updateRecord);
router.route("/hostelRoomType/:id").delete(upload.none(), deleteRecord);

module.exports = router;
