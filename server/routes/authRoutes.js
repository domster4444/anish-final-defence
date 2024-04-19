const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { registerValidator, loginValidator } = require("../middlewares/validators/testValidator");
const {
  registerUser,
  getAllSchoolUsers,
  getAllSchoolUsersOfParticularSchool,
  updateSchoolUserController,
  deleteSchoolUserController,
  verifiedRegisterUser,
  createAccountForEmailVerifiedUser,
  loginUser,
  getUserProfileData,
  getAllDriverUsersOfParticularSchool,
  getAllLibrarianUsersOfParticularSchool,
  getAllCanteenUsersOfParticularSchool,
  getAllStudentUsersOfParticularSchool,
  getAllHostelerUsersOfParticularSchool,
  getAllStudentOption,
  getAllStudentsBasedOnClassAndSection,
  registerStaff,
  deleteStaff,
  getAllTeacherUsersOfParticularSchool,
  getAllStaffOfParticularSchool,
  getStaffStats,
  getLastThreeUserWithRole,
  getStudentDemographic,
  getUserCount,
  registerStudent,
  getAllGuardian,
} = require("../controllers/authController");

const isUserLoggedInProd = require("../middlewares/isUserLoggedInProd");
const isUserAdminProd = require("../middlewares/isUserAdminProd");
const isUserCustomerProd = require("../middlewares/isUserCustomerProd");

router.route("/register-staff").post(upload.fields([{ name: "image" }, { name: "resume" }, { name: "joiningLetter" }, { name: "resignationLetter" }, { name: "otherDocument" }]), registerStaff);
router.route("/delete-staff/:id").delete(upload.none(), deleteStaff);
router.route("/register").post(upload.single("image"), registerValidator, registerUser);
router.route("/register-student").post(upload.single("image"), registerValidator, registerStudent);
router.route("/login").post(upload.none(), loginValidator, loginUser);
router.route("/profile/:id").get(getUserProfileData);
router.route("/get-all-school-users-of-particular-school").post(upload.none(), getAllSchoolUsersOfParticularSchool);
router.route("/get-all-school-driver-of-particular-school").post(upload.none(), getAllDriverUsersOfParticularSchool);
router.route("/get-all-school-teacher-of-particular-school").post(upload.none(), getAllTeacherUsersOfParticularSchool);
router.route("/get-all-staff-of-particular-school").post(upload.none(), getAllStaffOfParticularSchool);
router.route("/get-all-school-librarian-of-particular-school").post(upload.none(), getAllLibrarianUsersOfParticularSchool);
router.route("/get-all-school-hosteler-of-particular-school").post(upload.none(), getAllHostelerUsersOfParticularSchool);
router.route("/get-all-school-canteen-user-of-particular-school").post(upload.none(), getAllCanteenUsersOfParticularSchool);
router.route("/all-school-user").get(getAllSchoolUsers);
router.route("/get-all-school-student-of-particular-school").post(upload.none(), getAllStudentUsersOfParticularSchool);
router.route("/get-all-student-option").post(upload.none(), getAllStudentOption);

router.route("/delete-user/:id").delete(upload.none(), deleteSchoolUserController);
router.route("/update-user/:id").patch(upload.single("image"), updateSchoolUserController);
// router.route("/verified-register").post(registerValidator, verifiedRegisterUser);
// router.route("/create-account-for-email-verified").post(createAccountForEmailVerifiedUser);
router.route("/get-student-based-on-class-section").post(upload.none(), getAllStudentsBasedOnClassAndSection);
router.route("/staff/stats").post(upload.none(), getStaffStats);
router.route("/user/get-last-three-created/:role").post(upload.none(), getLastThreeUserWithRole);
router.route("/user/get-student-demographic").post(upload.none(), getStudentDemographic);
router.route("/user/get-user-count").post(upload.none(), getUserCount);
router.route("/get-all-guardian-of-particular-school").post(upload.none(), getAllGuardian);

module.exports = router;
