const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { sendContactUsQueryEmail } = require("../controllers/contactUsController");

router.route("/contactus-email").post(upload.none(), sendContactUsQueryEmail);

module.exports = router;
