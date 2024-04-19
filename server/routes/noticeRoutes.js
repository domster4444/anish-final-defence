const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { getAllNotices, createNotice, deleteNotice, getYourNotices, updateNotice, getNoticesByRole } = require("../controllers/noticeController");

router.route("/notices/createNotice").post(upload.none(), createNotice);
router.route("/notices/allNotices").get(upload.none(), getAllNotices);
router.route("/notices/yourNotices/:noticeFrom").get(upload.none(), getYourNotices);
router.route("/notices/updateNotice/:id").patch(upload.none(), updateNotice);
router.route("/notices/deleteNotice/:id").delete(upload.none(), deleteNotice);
router.route("/notices/allNoticesByRole/:role").get(upload.none(), getNoticesByRole);

module.exports = router;
