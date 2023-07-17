import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
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

const Post = mongoose.model("Post", PostSchema);

export default Post;
