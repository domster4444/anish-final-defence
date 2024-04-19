const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { addEventController, getAllEventsController, deleteEventController } = require("../controllers/eventController");

router.route("/event/add").post(upload.array("image", 1000), addEventController);
router.route("/event/get").get(getAllEventsController);
router.route("/event/:id").delete(deleteEventController);

module.exports = router;
