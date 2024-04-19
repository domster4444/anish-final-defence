const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createSection, getSingleSection, deleteSection, getAllSection, getAllSectionForSchool, updateSection, getAllSectionForClass } = require("../controllers/sectionController");

router.route("/section/create").post(upload.none(), createSection);
router.route("/section/:id").get(upload.none(), getSingleSection);
router.route("/section/get-all").post(upload.none(), getAllSection);
router.route("/section/get-all-for-school").post(upload.none(), getAllSectionForSchool);
router.route("/section/update/:id").patch(upload.none(), updateSection);
router.route("/section/:id").delete(upload.none(), deleteSection);
router.route("/section/get-all-section-for-a-class/:id").post(upload.none(), getAllSectionForClass);

module.exports = router;
