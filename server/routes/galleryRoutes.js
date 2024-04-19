const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { getGalleryStatsController, addGalleryController, deleteGalleryImageController, getAllGalleryImagesForASchoolController, addBulkGalleryController } = require("../controllers/galleryController");

router.route("/gallery/create").post(upload.single("image"), addGalleryController);
router.route("/gallery/:id").delete(upload.none(), deleteGalleryImageController);
router.route("/gallery/get-all-for-school").get(getAllGalleryImagesForASchoolController);
router.route("/gallery/stats").get(getGalleryStatsController);

// upload array of file images bulk
router.route("/gallery/bulk-upload").post(upload.array("image", 1000), addBulkGalleryController);

module.exports = router;
