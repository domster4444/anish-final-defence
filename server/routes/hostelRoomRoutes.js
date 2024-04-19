const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { getAllAssociatedRoomsForSpecificHostel, createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/hostelRoomController");

router.route("/hostelRoom/create").post(upload.none(), createRecord);
router.route("/hostelRoom/:id").get(upload.none(), getSingleRecord);
router.route("/hostelRoom/get-all").post(upload.none(), getAllRecord);
router.route("/hostelRoom/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/hostelRoom/update/:id").patch(upload.none(), updateRecord);
router.route("/hostelRoom/:id").delete(upload.none(), deleteRecord);
router.route("/hostelRoom/get-all-associated-rooms-for-specific-hostel/:name").post(upload.none(), getAllAssociatedRoomsForSpecificHostel);

module.exports = router;
