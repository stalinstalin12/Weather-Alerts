const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
  city: String,
  alertType: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Alert", AlertSchema);
