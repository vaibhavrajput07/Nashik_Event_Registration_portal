const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  selectedEvent: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Registration", registrationSchema);
