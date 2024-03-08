const {Asset,assetSchema} = require('../models/Asset');
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Add this line
exports.addAsset = async (req, res) => {
  try {
    const { assetClass, equity, gold, fixedDeposit, realEstate } = req.body;

    // Retrieve the JWT token from cookies
    const token = req.cookies.jwt;

    // Decode the JWT token to extract the user ID
    const decodedToken = jwt.verify(token, 'Port-folio-hulala');
    const userId = decodedToken.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new asset
    const newAsset = new Asset({ assetClass, equity, gold, fixedDeposit, realEstate });

    // Push the new asset to the user's assets array
    user.assets.push(newAsset);

    // Save the changes to the user document
    await user.save();

    // Save the new asset
    await newAsset.save();

    res.status(201).json({ message: `Asset added successfully to user ${userId}` });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};
