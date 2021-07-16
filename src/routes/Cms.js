const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cms");

router.get("/GetAllDeals", cmsController.getAllDeals);
router.get("/GetAllEvents", cmsController.GetAllEvents);
router.get("/GetContentList", cmsController.GetContentList);

module.exports = router;
