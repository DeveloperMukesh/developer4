const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

// DB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
