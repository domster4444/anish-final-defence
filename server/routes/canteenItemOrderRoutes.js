const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createRecord, getAllRecordForSchool, getAllRecordForUser, getSingleRecord, updateRecord, deleteRecord, getAllRecord, cancelOrder, getAllPendingOrder } = require("../controllers/canteenItemOrderController");

router.route("/canteenItemOrder/create").post(upload.none(), createRecord);
router.route("/canteenItemOrder/:id").get(upload.none(), getSingleRecord);
router.route("/canteenItemOrder/get-all").post(upload.none(), getAllRecord);
router.route("/canteenItemOrder/get-all-for-school").post(upload.none(), getAllRecordForSchool);
router.route("/canteenItemOrder/get-all-pending-order-for-school").post(upload.none(), getAllPendingOrder);
router.route("/canteenItemOrder/update/:id").patch(upload.none(), updateRecord);
router.route("/canteenItemOrder/cancel-order/:id").patch(upload.none(), cancelOrder);
router.route("/canteenItemOrder/:id").delete(upload.none(), deleteRecord);
router.route("/canteenItemOrder/get-all-for-user/:id").get(upload.none(), getAllRecordForUser);

module.exports = router;
