//* steps to connect to the database
//>>1 require mongoose
//>>2 require dotenv and configure it
//>>3 use mongoose to connect to the database URL from environment variables

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connection with Database successfully");
  } catch (error) {
    if (error) return console.log({ message: error.message });
  }
};

module.exports = connectDB;
