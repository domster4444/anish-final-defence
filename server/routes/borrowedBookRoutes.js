const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { damagedBookFine, lostBookFine, payFine, returnBorrowedBook, calculateFine, getAllBorrowersOfABook, createRecord, getAllRecordForSchool, getSingleRecord, updateRecord, deleteRecord, getAllRecord } = require("../controllers/borrowedBookController");

router.route("/borrowedBook/create").post(upload.none(), createRecord);
router.route("/borrowedBook/:id").get(upload.none(), getSingleRecord);
router.route("/borrowedBook/get-all").post(upload.none(), getAllRecord);
router.route("/borrowedBook/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/borrowedBook/update/:id").patch(upload.none(), updateRecord);
router.route("/borrowedBook/:id").delete(upload.none(), deleteRecord);
router.route("/borrowedBook/get-all-borrowers/:id").get(upload.none(), getAllBorrowersOfABook);
router.route("/borrowedBook/calculate-fine/:id").post(upload.none(), calculateFine);
router.route("/borrowedBook/return-borrowed-book/:id").post(upload.none(), returnBorrowedBook);
router.route("/borrowedBook/pay-fine/:id").post(upload.none(), payFine);
router.route("/borrowedBook/lost-book-fine/:id").post(upload.none(), lostBookFine);
router.route("/borrowedBook/damaged-book-fine/:id").post(upload.none(), damagedBookFine);

module.exports = router;
