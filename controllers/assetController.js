const Asset = require('../models/Asset');

exports.addAsset = async (req, res) => {
  try {
    const { assetClass, equity, gold, fixedDeposit, realEstate } = req.body;
    const newAsset = new Asset({ assetClass, equity, gold, fixedDeposit, realEstate });
    await newAsset.save();
    res.status(201).json({ message: 'Asset added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
