const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { addRecordController, deleteRecordController, getAllRecordForASchoolController } = require("../controllers/achievementCertificateDesignController");

router.route("/achievementCertificateDesign/create").post(upload.fields([{ name: "design" }]), addRecordController);

router.route("/achievementCertificateDesign/:id").delete(upload.none(), deleteRecordController);
router.route("/achievementCertificateDesign/get-all-for-school").get(getAllRecordForASchoolController);

module.exports = router;
