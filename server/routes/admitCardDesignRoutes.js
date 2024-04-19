const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { addRecordController, deleteRecordController, getAllRecordForASchoolController } = require("../controllers/admitCardDesignController");

router.route("/admitCardDesign/create").post(upload.fields([{ name: "design" }]), addRecordController);

router.route("/admitCardDesign/:id").delete(upload.none(), deleteRecordController);
router.route("/admitCardDesign/get-all-for-school").get(getAllRecordForASchoolController);

module.exports = router;
