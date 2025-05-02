const mongoose = require("mongoose");
const ConnectToDB = async () => {
  try {
    if (mongoose.connection[0].readyState) {
      return false;
    }
    await mongoose.connect("mongodb://localhost:27017/next-cms");
  } catch (error) {
    console.log("err in db connection");
  }
};
