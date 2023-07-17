import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Post from "../models/postModel";

export type PostType = {
  _id: string;
  createdAt: number;
  updatedAt?: number;
  title: string;
  body: string;
  image: string;
  like: number;
  publish: boolean;
};

/**
 * Fetch all posts
 * GET /posts
 */

export const getPosts = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    try {
      const posts = await Post.find({});
      res.json(posts);
    } catch (error) {
      res.send(error);
    }
  }
);

/**
 * Add new post
 * POST /posts
 */

export const addPost = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const newPost = new Post(req.body as PostType);
    try {
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      res.send(error);
    }
  }
);

/**
 * Delete post
 * DELETE /posts/:postId
 */

export const deletePost = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    try {
      await Post.deleteOne({
        _id: req.params.postId,
      });
      res.json({ message: "Post successfully deleted" });
    } catch (error) {
      res.send(error);
    }
  }
);

/**
 * Update post
 * PATCH /posts/:postId
 */

export const updatePost = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    try {
      const post = await Post.findOneAndUpdate(
        {
          _id: req.params.postId,
        },
        req.body,
        { new: true }
      );
      if (post) {
        res.json(post);
      } else {
        res.status(404).send({ message: "Post not found" });
      }
    } catch (error) {
      res.send(error);
    }
  }
);
