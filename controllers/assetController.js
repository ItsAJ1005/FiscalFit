const { Asset, assetSchema } = require("../models/Asset");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const monthlyGoldCostsData = require("../data/monthlyGoldCosts");
const fs = require("fs");
const path = require("path");

exports.addAsset = async (req, res) => {
  try {
    const { assetClass, equity, gold, fixedDeposit, realEstate } = req.body;
    const token = req.cookies.jwt || req.headers.jwt;
    const decodedToken = jwt.verify(token, "Port-folio-hulala");
    const userId = decodedToken.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User ID:", userId);
    const newAsset = new Asset({
      user: userId ,
      assetClass,
      equity,
      gold,
      fixedDeposit,
      realEstate,
    });

    user.assets.push(newAsset);

    await user.save();

    await newAsset.save();

    res
      .status(201)
      .json({ message: `Asset added successfully to user ${userId}` });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};

exports.calculateRealEstateDifferenceForUser = async (req, res) => {
  try {
    const token = req.cookies.jwt || req.headers.jwt;

    const decodedToken = jwt.verify(token, "Port-folio-hulala");
    const userId = decodedToken.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const assetsObject = user.assets[0];

    if (!assetsObject) {
      return res
        .status(404)
        .json({ message: "Assets object not found for the user" });
    }

    const realEstateAsset = assetsObject.realEstate;

    if (!realEstateAsset) {
      return res
        .status(404)
        .json({ message: "Real estate asset not found for the user" });
    }

    const purchasePrice = realEstateAsset.purchasePrice;
    const todayPrice = realEstateAsset.todayPrice;
    const difference = todayPrice - purchasePrice;

    let status;
    if (difference > 0) {
      status = "Profit";
    } else if (difference < 0) {
      status = "Loss";
    } else {
      status = "No Change";
    }

    res.status(200).json({ difference, status });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};

exports.calculateFDDifferenceForUser = async (req, res) => {
  try {
    const token = req.cookies.jwt || req.headers.jwt;

    const decodedToken = jwt.verify(token, "Port-folio-hulala");
    const userId = decodedToken.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const assetsObject = user.assets[0];
    if (!assetsObject) {
      return res
        .status(404)
        .json({ message: "Assets object not found for the user" });
    }
    const fdAsset = assetsObject.fixedDeposit;
    if (!fdAsset) {
      return res
        .status(404)
        .json({ message: "Fixed deposit asset not found for the user" });
    }
    const principalAmount = fdAsset.principalAmount;
    const interestRate = fdAsset.interestRate;
    const tenure = fdAsset.tenure;
    const maturityAmount =
      principalAmount * Math.pow(1 + interestRate / 100, tenure);

    const difference = maturityAmount - principalAmount;
    let status;
    if (difference > 0) {
      status = "Profit";
    } else if (difference < 0) {
      status = "Loss";
    } else {
      status = "No Change";
    }

    res.status(200).json({ difference, status });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};



exports.calculateGoldProfitForUser = async (req, res) => {
  try {
    const token = req.cookies.jwt || req.cookies.jwt;
    const decodedToken = jwt.verify(token, "Port-folio-hulala");
    const userId = decodedToken.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const assetsObject = user.assets[0];
    if (!assetsObject) {
      return res.status(404).json({ message: "Assets object not found for the user" });
    }

    const goldAsset = assetsObject.gold;
    if (!goldAsset) {
      return res.status(404).json({ message: "Gold asset not found for the user" });
    }

    const goldPurchaseDate = goldAsset.dateOfPurchase;
    const goldGramsBought = goldAsset.gramsBought;

    const monthlyGoldCost = monthlyGoldCostsData.filter(item => {
      const itemDate = new Date(item.Date.trim());
      return itemDate.getFullYear() >= goldPurchaseDate.getFullYear() &&
        itemDate.getMonth() >= goldPurchaseDate.getMonth();
    });

    if (!monthlyGoldCost) {
      return res.status(404).json({ message: "Monthly gold cost not found for the purchase date" });
    }
    const scaledGoldCost = monthlyGoldCost.map(obj => {
      return parseFloat(obj.INR.replace(',', '')) * goldGramsBought / 2.834952; 
    }); 

    return res.json({ scaledGoldCost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.calculateSharpeRatio = async (req, res) => {
  try {
    const token = req.cookies.jwt || req.headers.jwt;
    const decodedToken = jwt.verify(token, "Port-folio-hulala");
    const userId = decodedToken.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const assetsObject = user.assets[0];
    if (!assetsObject) {
      return res.status(404).json({ message: "Assets object not found for the user" });
    }

    let totalReturns = 0;
    let totalInvestment = 0;
    ['equity', 'gold', 'fixedDeposit', 'realEstate'].forEach(assetClass => {
      const asset = assetsObject[assetClass];
      if (asset) {
        totalReturns += asset.totalInvestment || asset.principalAmount || asset.purchasePrice || 0;
        totalInvestment += asset.totalInvestment || asset.principalAmount || asset.purchasePrice || 0;
      }
    });
    const expectedReturn = totalReturns / totalInvestment;

    const returnsArray = ['equity', 'gold', 'fixedDeposit', 'realEstate'].map(assetClass => {
      const asset = assetsObject[assetClass];
      if (asset) {
        return (asset.totalInvestment || asset.principalAmount || asset.purchasePrice || 0) / totalInvestment;
      }
      return 0;
    });
    const standardDeviation = calculateStandardDeviation(returnsArray);

    const riskFreeRate = 0.02; 

 
    const sharpeRatio = (expectedReturn - riskFreeRate) / standardDeviation;

    res.json({ sharpeRatio });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

function calculateStandardDeviation(values) {
  const n = values.length;
  const mean = values.reduce((acc, val) => acc + val, 0) / n;
  const variance = values.reduce((acc, val) => acc + (val - mean) ** 2, 0) / n;
  return Math.sqrt(variance);
}

