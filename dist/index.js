"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const posts_1 = __importDefault(require("./routes/v1/posts"));
// エラーハンドリング用のミドルウェアを作成して読み込んでいます
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const db_1 = __importDefault(require("./config/db"));
// DBと接続
(0, db_1.default)();
const app = (0, express_1.default)();
// CORS設定
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/posts", posts_1.default);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
// .envファイル内PORT設定したポート番号で起動。デフォルトは3001。
const port = process.env.PORT || 3001;
app.listen(port);
console.log("Express WebAPI listening on port " + port);
//# sourceMappingURL=index.js.map