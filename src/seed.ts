import dotenv from "dotenv";
import { posts } from "./data/posts";
import Post from "./models/postModel";
import connectDB from "./config/db";

dotenv.config();

// DBに接続
connectDB();

// データのインポート
const importData = async () => {
  try {
    // 一旦中身を全削除
    await Post.deleteMany();

    // postsの中身を全件登録
    const createPosts = await Post.insertMany(posts);

    console.log(`Data Imported!`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// 登録データの破棄
const destroyData = async () => {
  try {
    await Post.deleteMany();

    console.log(`Data Destroyed!`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// コマンドラインでパラメータ -d を渡すと削除モードにする
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
