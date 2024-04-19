const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createNewCategory, getAllNoticeCategories, deleteNoticeCategory } = require("../controllers/noticeCategoryController");

router.route("/notice-category/create").post(upload.none(), createNewCategory);
router.route("/notice-category/getAllCategories").get(upload.none(), getAllNoticeCategories);
router.route("/notice-category/delete/:id").delete(upload.none(), deleteNoticeCategory);

module.exports = router;