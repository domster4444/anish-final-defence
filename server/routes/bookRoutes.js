const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { getAllBookOption, getAllBooksForSchool, createBook, getBook, getAllBooks, updateBook, deleteBook } = require("../controllers/bookController");

router.route("/book/create").post(upload.single("coverImage"), createBook);
router.route("/book/get/:id").get(getBook);
router.route("/book/get-all").get(getAllBooks);
router.route("/book/update/:id").patch(upload.single("coverImage"), updateBook);
router.route("/book/delete/:id").delete(upload.none(), deleteBook);
router.route("/book/get-all-for-school/:id").get(upload.none(), getAllBooksForSchool);
router.route("/book/get-all-book-option").post(upload.none(), getAllBookOption);

module.exports = router;
