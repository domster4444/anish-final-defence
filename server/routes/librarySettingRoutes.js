const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getRecord } = require("../controllers/librarySettingController");

router.route("/librarySetting/create").post(upload.none(), createRecord);
router.route("/librarySetting/get").post(upload.none(), getRecord);

module.exports = router;
