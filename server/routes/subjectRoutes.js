const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { getClassesFromSubject, getSubjectArrayForClassAndSection, createSubject, getSingleSubject, deleteSubject, getAllSubject, getAllSubjectForSchool, updateSubject, getAllSubjectForClass } = require("../controllers/subjectController");

router.route("/subject/get-all-sub-given-class-section").post(upload.none(), getSubjectArrayForClassAndSection);
router.route("/subject/create").post(upload.none(), createSubject);
router.route("/subject/:id").get(upload.none(), getSingleSubject);
router.route("/subject/get-all").post(upload.none(), getAllSubject);
router.route("/subject/get-all-for-school").post(upload.none(), getAllSubjectForSchool);
router.route("/subject/update/:id").patch(upload.none(), updateSubject);
router.route("/subject/:id").delete(upload.none(), deleteSubject);
router.route("/subject/get-all-subject-for-a-class/:id").post(upload.none(), getAllSubjectForClass);
router.route("/subject/get-all-class-from-subject").post(upload.none(), getClassesFromSubject);

module.exports = router;
