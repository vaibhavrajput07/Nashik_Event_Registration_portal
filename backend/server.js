const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/nashik-events", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error(" MongoDB Error:", err));

const authRoutes = require("./routes/auth"); 
const registrationRoutes = require("./routes/registrationRoutes");
const eventRoutes = require('./routes/eventRoutes');

app.use("/api/auth", authRoutes); //auth route
app.use("/api/registrations", registrationRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
