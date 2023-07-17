import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Post {
    _id: ID!
    createdAt: Int!
    updatedAt: Int
    title: String!
    body: String!
    image: String!
    like: Int!
    publish: Boolean!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    addPost(
      title: String!
      body: String!
      image: String!
      like: Int!
      publish: Boolean!
    ): Post!
    deletePost(id: ID!): Post
    updatePost(
      id: ID!
      title: String
      body: String
      image: String
      like: Int
      publish: Boolean
    ): Post
  }
`;
