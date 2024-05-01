const mongoose = require("mongoose");

const equitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "naiveUser",
    required: true,
  },
  stockName: { type: String, required: true },
  dateOfPurchase: { type: Date, required: true },
  sharePriceAtPurchase: { type: Number, required: true },
  totalInvestment: { type: Number, required: true },
});

const goldSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "naiveUser",
    required: true,
  },
  dateOfPurchase: { type: Date, required: true },
  pricePer10g: { type: Number, required: true },
  gramsBought: { type: Number, required: true },
});

const fixedDepositSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "naiveUser",
    required: true,
  },
  dateOfPurchase: { type: Date, required: true },
  principalAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  tenure: { type: Number, required: true },
});

const realEstateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "naiveUser",
    required: true,
  },
  purchasePrice: { type: Number, required: true },
  todayPrice: { type: Number, required: true },
});

const assetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "naiveUser",
    required: true,
  },
  assetClass: { type: String, required: true },
  equity: [equitySchema],
  gold: goldSchema,
  fixedDeposit: fixedDepositSchema,
  realEstate: realEstateSchema,
  income: { type: Number, required: true } 
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  assets: [assetSchema],
});

const Asset = mongoose.model("Asset", assetSchema);

exports.Asset = Asset;
exports.assetSchema = assetSchema;
