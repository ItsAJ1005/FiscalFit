const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");
const { calculateGoldProfitForUser } = require("../controllers/assetController")
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("../utils/PolicyEnforcementPoint");
const rbacMiddleware = new RBACMiddleware();
const isNaive = require("../middlewares/isNaive");

router.post("/create",isNaive,rbacMiddleware.execute("create_asset"),PDP.execute,assetController.addAsset);
router.get("/fd-difference",isNaive,rbacMiddleware.execute("read_asset"),PDP.execute,assetController.calculateFDDifferenceForUser);//
router.get("/gold/profit",isNaive,rbacMiddleware.execute("read_asset"),PDP.execute,calculateGoldProfitForUser);//
router.get("/investment-risk",isNaive,rbacMiddleware.execute("read_asset"),PDP.execute,assetController.calculateSharpeRatio);//
router.get("/stock/profit", assetController.calculateStockProfit);//
router.get("/calculateTaxForUser", assetController.calculateTaxForUser);
router.get("/fdDetails", assetController.getFixedDepositInfo);


router.get('/stock-values', assetController.getAllStockValues);
router.get('/userRealEstateInvestment', assetController.getRealEstatePurchasePrice);



router.get("/real-estate-difference",isNaive,rbacMiddleware.execute("read_asset"),PDP.execute,assetController.calculateRealEstateDifferenceForUser);



router.put("/gold", assetController.updateAssetAttribute);
router.put('/fd', assetController.updateFDMetaAttribute);
router.put('/realEstate', assetController.updateRealEstateAttribute);
router.put('/equity', assetController.updateEquityAttribute);


module.exports = router;

