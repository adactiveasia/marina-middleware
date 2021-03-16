const express = require("express");
const router = express.Router();
const mapController = require("../controllers/map");

router.get("/", mapController.listAllMaps);
router.post("/get", mapController.getMap);
router.post("/create", mapController.addMap);

router.post("/edit", mapController.editMap);

router.delete("/delete", mapController.deleteMap);

module.exports = router;
