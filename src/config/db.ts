import mongoose from "mongoose";
import dotenv from "dotenv";

// .envファイルの設定を読み込み
dotenv.config();

// .envファイルで設定したMONGO_URIを設定
const DATABASE_URL = process.env.MONGO_URI || "http:localhost:3001";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(DATABASE_URL);
    console.log(`MongoDB Connected ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
