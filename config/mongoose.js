const mongoose = require('mongoose');
const DB_URL = process.env.MONGO_URI
mongoose.connect(DB_URL);
module.exports = mongoose;