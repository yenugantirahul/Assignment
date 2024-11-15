const mongoose = require("mongoose");
// Ensure .env configuration is loaded
require("dotenv").config();

// Corrected variable naming for readability
const mongoDB_URL = process.env.MONGO_URL;

mongoose
  .connect(mongoDB_URL, {
    dbName: "contacts",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    // Using `console.error` for errors
    console.error("MongoDB connection failed:", err);
  });
