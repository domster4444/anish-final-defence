const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { getTeacherTimeTableByTeacherId, getClassTimeTableByClassIdAndSectionName, createRecord, getAllClassTimeTableNames, deleteClassTimeTableByName, getSubjectsByClassTeacherId, getClassesTeacherTeachByTeacherId, getAllClassesForDay } = require("../controllers/classTimeTableController");

router.route("/classTimeTable/create").post(upload.none(), createRecord);
router.route("/classTimeTable/get-all-timetable-name").post(upload.none(), getAllClassTimeTableNames);
router.route("/classTimeTable/delete/:classTimeTableName").delete(upload.none(), deleteClassTimeTableByName);
router.route("/classTimeTable/get-subjects-by-class-teacher-id/:classTeacherId/:classId").get(getSubjectsByClassTeacherId);

router.route("/classTimeTable/get-classes-teacher-teach/:classTeacherId").get(upload.none(), getClassesTeacherTeachByTeacherId);
router.route("/classTimeTable/get-get-all-classes-for-day").post(upload.none(), getAllClassesForDay);
router.route("/classTimeTable/get-by-classid-and-section").post(upload.none(), getClassTimeTableByClassIdAndSectionName);
router.route("/classTimeTable/get-by-teacherid").post(upload.none(), getTeacherTimeTableByTeacherId);
module.exports = router;
