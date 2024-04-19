const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/studentAchievementController");

router.route("/studentAchievement/create").post(upload.none(), createRecord);
router.route("/studentAchievement/:id").get(upload.none(), getSingleRecord);
router.route("/studentAchievement/get-all").post(upload.none(), getAllRecord);
router.route("/studentAchievement/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/studentAchievement/update/:id").patch(upload.none(), updateRecord);
router.route("/studentAchievement/:id").delete(upload.none(), deleteRecord);

module.exports = router;
