const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");
const { calculateGoldProfitForUser } = require("../controllers/assetController")


router.post("/add", assetController.addAsset);
router.get("/real-estate-difference",assetController.calculateRealEstateDifferenceForUser);
router.get("/fd-difference", assetController.calculateFDDifferenceForUser);
router.get("/gold/profit", calculateGoldProfitForUser);
router.get("/investment-risk", assetController.calculateSharpeRatio);
router.get("/calculateTaxForUser", assetController.calculateTaxForUser);
module.exports = router;
