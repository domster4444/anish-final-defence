const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createClass, getSingleClass, deleteClass, getAllClass, getAllClassForSchool, updateClass } = require("../controllers/classController");

router.route("/class/create").post(upload.none(), createClass);
router.route("/class/:id").get(upload.none(), getSingleClass);
router.route("/class/get-all").post(upload.none(), getAllClass);
router.route("/class/get-all-for-school").post(upload.none(), getAllClassForSchool);
router.route("/class/update/:id").patch(upload.none(), updateClass);
router.route("/class/:id").delete(upload.none(), deleteClass);

module.exports = router;
