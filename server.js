require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
connectDB();
const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  app.listen(PORT, (err) => {
    if (err) return console.log(err.message);
    console.log(`http://localhost:${PORT}`);
  });
});
