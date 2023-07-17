"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const posts_1 = require("./data/posts");
const postModel_1 = __importDefault(require("./models/postModel"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
// DBに接続
(0, db_1.default)();
// データのインポート
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 一旦中身を全削除
        yield postModel_1.default.deleteMany();
        // postsの中身を全件登録
        const createPosts = yield postModel_1.default.insertMany(posts_1.posts);
        console.log(`Data Imported!`);
        process.exit();
    }
    catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
});
// 登録データの破棄
const destroyData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield postModel_1.default.deleteMany();
        console.log(`Data Destroyed!`);
        process.exit();
    }
    catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
});
// コマンドラインでパラメータ -d を渡すと削除モードにする
if (process.argv[2] === "-d") {
    destroyData();
}
else {
    importData();
}
//# sourceMappingURL=seed.js.map