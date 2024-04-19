const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord, getIncidentStats } = require("../controllers/assignIncidentController");

router.route("/assignIncident/create").post(upload.none(), createRecord);
router.route("/assignIncident/:id").get(upload.none(), getSingleRecord);
router.route("/assignIncident/get-all").post(upload.none(), getAllRecord);
router.route("/assignIncident/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/assignIncident/update/:id").patch(upload.none(), updateRecord);
router.route("/assignIncident/:id").delete(upload.none(), deleteRecord);
router.route("/assignIncident/get-all-stats").post(upload.none(), getIncidentStats);

module.exports = router;
