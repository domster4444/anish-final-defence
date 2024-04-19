const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { submitAssignment, viewSubmittedAssignments, updateGrade, updateRemark, deleteSubmission, submittedAssignmentsCount } = require("../controllers/submissionController");

router.route("/submissions/submitAssignment/:assignmentId").post(upload.array("s3files", 5), submitAssignment);
router.route("/submissions/submittedAssignments/:assignmentId").get(upload.none(), viewSubmittedAssignments);
router.route("/submissions/updateGrade/:submissionId").patch(upload.none(), updateGrade);
router.route("/submissions/updateRemark/:submissionId").patch(upload.none(), updateRemark);
router.route("/submissions/deleteSubmission/:submissionId").delete(upload.none(), deleteSubmission);
router.route("/submissions/countSubmissions/:studentId").get(upload.none(), submittedAssignmentsCount);


module.exports = router;