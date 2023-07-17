import express from "express";
import cors from "cors";
import postRoutes from "./routes/v1/posts";
// エラーハンドリング用のミドルウェアを作成して読み込んでいます
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import connectDB from "./config/db";

// DBと接続
connectDB();

const app = express();

// CORS設定
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postRoutes);

app.use(notFound);
// app.use(errorHandler);

// .envファイル内PORT設定したポート番号で起動。デフォルトは3001。
const port = process.env.PORT || 3001;

app.listen(port);
console.log("Express WebAPI listening on port " + port);
