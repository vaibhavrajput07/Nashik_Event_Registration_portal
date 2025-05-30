const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

// GET /api/registrations?event=EventName
router.get("/", async (req, res) => {
  const eventName = req.query.event;

  try {
    let registrations;
    if (eventName) {
      registrations = await Registration.find({ selectedEvent: eventName });
    } else {
      registrations = await Registration.find();
    }
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// POST /api/registrations - Submit registration
router.post("/", async (req, res) => {
  const { name, email, mobile, selectedEvent } = req.body;

  if (!name || !email || !mobile || !selectedEvent) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newRegistration = new Registration({ name, email, mobile, selectedEvent });
    const saved = await newRegistration.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;
