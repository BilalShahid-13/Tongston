const mongoose = require("mongoose");

const { USERNAME, PASSWORD } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(
      // `mongodb+srv://TongstonDev:${PASSWORD}@tworld1.tslnb.mongodb.net/?retryWrites=true&w=majority&appName=Tworld1`
      `mongodb+srv://tongston:${PASSWORD}@cluster0.zgp9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("db connected successfully");
  } catch (error) {
    console.log("error to connect mongo db" + error);
  }
};
module.exports = connectDB;
// # USERNAME=TongstonDev
// # PASSWORD=%23Dev_Tworld2024
