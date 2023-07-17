import Post from "./models/postModel";

export const resolvers = {
  Query: {
    posts: async () => {
      return await Post.find({});
    },
    post: async (_, { id }) => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    addPost: async (_, { title, body, image, like, publish }) => {
      const newPost = new Post({ title, body, image, like, publish });
      return await newPost.save();
    },
    deletePost: async (_, { id }) => {
      return await Post.findByIdAndDelete(id);
    },
    updatePost: async (_, { id, title, body, image, like, publish }) => {
      return await Post.findByIdAndUpdate(
        id,
        { title, body, image, like, publish },
        { new: true }
      );
    },
  },
};
