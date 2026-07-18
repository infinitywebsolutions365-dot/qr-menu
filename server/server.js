const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const restaurantRoutes = require("./routes/restaurantRoutes");

const menuRoutes = require("./routes/menuRoutes");

const restaurantOwnerRoutes = require("./routes/restaurantOwnerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/restaurants",restaurantRoutes);

app.use("/api/menu", menuRoutes);

app.use("/api/owner",restaurantOwnerRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("QR Menu API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});