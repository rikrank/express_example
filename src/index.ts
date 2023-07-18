import express from "express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import expressPlayground from "graphql-playground-middleware-express";
import connectDB from "./config/db";

// DBと接続
connectDB();

const app = express();

// Apollo Serverの設定
const server = new ApolloServer({ typeDefs, resolvers });

// Apollo Serverを起動
server.start().then(() => {
  // .envファイル内PORT設定したポート番号で起動。デフォルトは3001。
  const port = process.env.PORT || 3001;

  app.use("/graphql", server.getMiddleware());

  // GraphQL Playgroundを設定
  app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
    console.log(`🚀 Playground ready at http://localhost:${port}/playground`);
  });
});
