const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");

router.post("/add", assetController.addAsset);

router.get(
  "/real-estate-difference",
  assetController.calculateRealEstateDifferenceForUser
);
router.get("/fd-difference", assetController.calculateFDDifferenceForUser);

router.get('/gold-growth', assetController.calculateGoldGrowthForUser);
module.exports = router;
