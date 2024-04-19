const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getSinglePost, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/postController");

router.route("/post/create").post(upload.single("coverImage"), createRecord);
router.route("/post/get/:id").get(getSingleRecord);
router.route("/post/get-all").get(getAllRecord);
router.route("/post/update/:id").patch(upload.single("coverImage"), updateRecord);
router.route("/post/delete/:id").delete(upload.none(), deleteRecord);
router.route("/post/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/post/getSinglePost/:id").post(upload.none(), getSinglePost);

module.exports = router;
