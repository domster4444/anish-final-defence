const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { addRecordController, deleteRecordController, getAllRecordForASchoolController } = require("../controllers/idCardDesignController");

router
  .route("/idCardDesign/create")
  .post(
    upload.fields([{ name: "redCardFrontDesign" }, { name: "redCardBackDesign" }, { name: "greenCardFrontDesign" }, { name: "greenCardBackDesign" }, { name: "blueCardFrontDesign" }, { name: "blueCardBackDesign" }, { name: "yellowCardFrontDesign" }, { name: "yellowCardBackDesign" }]),
    addRecordController
  );

router.route("/idCardDesign/:id").delete(upload.none(), deleteRecordController);
router.route("/idCardDesign/get-all-for-school").get(getAllRecordForASchoolController);

module.exports = router;
