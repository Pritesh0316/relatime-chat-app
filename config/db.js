const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db_Url = process.env.ATLASDB_URL;
    await mongoose.connect(db_Url);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;