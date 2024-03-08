const {Asset,assetSchema} = require('../models/Asset');
const User = require('../models/User');

exports.addAsset = async (req, res) => {
  try {
    const { assetClass, equity, gold, fixedDeposit, realEstate } = req.body;
    const user = await User.findById(req.headers.token);
    const newAsset = new Asset({ assetClass, equity, gold, fixedDeposit, realEstate });
    user.assets.push(newAsset);
    await user.save();
    await newAsset.save();
    res.status(201).json({ message: `Assets added successfully to user ${req.headers.token}` });
  } catch (error) {
    console.error(`Err : ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};
