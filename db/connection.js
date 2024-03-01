const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/PersonalPortfolioSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('MongoDB connection failed:', err);
  process.exit(1);
});
