const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();


const { createAssignment, getAllAssignments, deleteAssignment, updateAssignment, viewTeachersAssignment, viewStudentsAssignment } = require("../controllers/assignmentController");

router.route("/assignments/createAssignment").post(upload.array("s3files", 5), createAssignment);
router.route("/assignments/allAssignments").get(upload.none(), getAllAssignments);
router.route("/assignments/viewTeachersAssignment/:teacherId").get(upload.none(), viewTeachersAssignment);
router.route("/assignments/viewStudentsAssignment/:studentId/:classId").get(upload.none(), viewStudentsAssignment);
router.route("/assignments/updateAssignment/:assignmentId").patch(upload.none(), updateAssignment);
router.route("/assignments/deleteAssignment/:assignmentId").delete(upload.none(), deleteAssignment);

module.exports = router;