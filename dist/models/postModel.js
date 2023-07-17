"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        required: true,
        default: 0,
    },
    publish: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
}
// timestampsオプションをtrueにすることでmongoDBが自動的にupdatedAtフィールドを生成、更新してくれます。
// 今回はフロントエンドのロジックの都合上上記で手動で用意しています。
// {
//   timestamps: true,
// },
);
const Post = mongoose_1.default.model("Post", PostSchema);
exports.default = Post;
//# sourceMappingURL=postModel.js.map