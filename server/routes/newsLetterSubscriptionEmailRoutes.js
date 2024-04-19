const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { sendNewsLetterSubscriptionEmail } = require("../controllers/newsLetterSubscriptionEmailController");

router.route("/subscription-email").post(upload.none(), sendNewsLetterSubscriptionEmail);

module.exports = router;
