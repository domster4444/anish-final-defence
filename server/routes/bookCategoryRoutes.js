const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { getAllBookCategoriesForSchool, createBookCategory, getBookCategory, getAllBookCategories, updateBookCategory, deleteBookCategory } = require("../controllers/bookCategoryController");

router.route("/book-category/create").post(upload.none(), createBookCategory);
router.route("/book-category/get/:id").get(getBookCategory);
router.route("/book-category/get-all").get(getAllBookCategories);
router.route("/book-category/update/:id").patch(upload.none(), updateBookCategory);
router.route("/book-category/delete/:id").delete(upload.none(), deleteBookCategory);
router.route("/book-category/get-all-for-school").get(upload.none(), getAllBookCategoriesForSchool);

module.exports = router;
