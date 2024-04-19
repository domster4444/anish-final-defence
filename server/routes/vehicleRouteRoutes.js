const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { getAllAssociatedVehicleForSpecificRoute, createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/vehicleRouteController");

router.route("/vehicleRoute/create").post(upload.none(), createRecord);
router.route("/vehicleRoute/:id").get(upload.none(), getSingleRecord);
router.route("/vehicleRoute/get-all").post(upload.none(), getAllRecord);
router.route("/vehicleRoute/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/vehicleRoute/update/:id").patch(upload.none(), updateRecord);
router.route("/vehicleRoute/:id").delete(upload.none(), deleteRecord);
router.route("/vehicleRoute/get-all-associated-vehicle-for-specific-route/:name").post(upload.none(), getAllAssociatedVehicleForSpecificRoute);

module.exports = router;
