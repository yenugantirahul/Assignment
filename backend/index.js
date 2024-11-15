// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // React app's URL
    // React app's URL
  })
);
app.use(bodyParser.json());
app.use("/api/contacts", contactRoutes);
// Start the server
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
