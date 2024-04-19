const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { schoolRegisterValidator, schoolLoginValidator } = require("../middlewares/validators/schoolModelValidator");

const { registerSchoolController, downloadSchoolsDataPdf, loginSchoolController, getSchoolProfileController, getAllSchoolsController, updateSchoolController, deleteSchoolController } = require("../controllers/schoolController");

router.route("/school-register").post(upload.fields([{ name: "schoolLogo" }, { name: "principalSignature" }]), registerSchoolController);
router.route("/school-login").post(upload.none(), loginSchoolController);
router.route("/update-school/:id").put(upload.fields([{ name: "schoolLogo" }, { name: "principalSignature" }]), updateSchoolController);
router.route("/delete-school/:id").delete(upload.none(), deleteSchoolController);
router.route("/get-school-profile/:id").get(getSchoolProfileController);
router.route("/get-all-school").get(getAllSchoolsController); // not used till now

module.exports = router;
