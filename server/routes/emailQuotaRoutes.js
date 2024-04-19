const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createEmailQuota, increaseEmailQuota, getTotalEmailQuota, isEmailLimitExceeded } = require("../controllers/emailQuotaController");

router.route("/email-quota/create").post(upload.none(), createEmailQuota);
router.route("/email-quota/increase").post(upload.none(), increaseEmailQuota);
router.route("/email-quota").get(getTotalEmailQuota);
router.route("/email-quota/is-email-limit-exceeded").get(isEmailLimitExceeded);

module.exports = router;
