const { Asset, assetSchema } = require("../models/Asset");
const User = require("../models/User");
const jwt = require("jsonwebtoken"); 
const axios = require('axios');

exports.addAsset = async (req, res) => {
  try {
    const { assetClass, equity, gold, fixedDeposit, realEstate } = req.body;
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, "Port-folio-hulala");
    const userId = decodedToken.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAsset = new Asset({
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
exports.calculateGoldGrowthForUser = async (req, res) => {
  const userId = req.cookies.jwt;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const assetsObject = user.assets[0]; 

    if (!assetsObject) {
      return res.status(404).json({ message: 'Assets object not found for the user' });
    }

    const goldAsset = assetsObject.gold;

    if (!goldAsset) {
      return res.status(404).json({ message: 'Gold asset not found for the user' });
    }

    const { dateOfPurchase } = goldAsset;

    const purchaseDate = new Date(dateOfPurchase);
    const today = new Date();

    const monthlyGrowth = [];

    for (let currentMonth = new Date(purchaseDate); currentMonth <= today; currentMonth.setMonth(currentMonth.getMonth() + 1)) {
      // Get the start and end dates for the current month
      const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

      const apiKey = 'f93f2ab942408ca096636efe237ae902'; 
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      const apiUrl = `https://api.metalpriceapi.com/v1/timeframe?api_key=${apiKey}&start_date=${startDateStr}&end_date=${endDateStr}&base=USD&currencies=XAU`;

      const response = await axios.get(apiUrl);
      const historicalPrices = response.data?.prices?.XAU?.USD || [];

      const initialPrice = goldAsset.pricePer10g * goldAsset.gramsBought;
      const currentPrice = historicalPrices[0]?.close || 0;

      const growth = (currentPrice - initialPrice) * goldAsset.gramsBought;

      monthlyGrowth.push({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        growth
      });
    }

    res.json(monthlyGrowth);
  } catch (error) {
    console.error('Error calculating gold growth:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.calculateRealEstateDifferenceForUser = async (req, res) => {
  try {
    const token = req.cookies.jwt;

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
    const token = req.cookies.jwt;

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
