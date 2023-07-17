import express from "express";
import Blog, { IBlog } from "../models/Blog";
import { Document } from "mongoose";

const router = express.Router();

// Create a blog post
router.post("/", async (req, res) => {
  const blog: IBlog & Document = new Blog({
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one blog post
router.get("/:id", getBlog, (req, res) => {
  res.json(res.blog);
});

// Update one blog post
router.patch("/:id", getBlog, async (req, res) => {
  if (req.body.title != null) {
    res.blog.title = req.body.title;
  }
  if (req.body.content != null) {
    res.blog.content = req.body.content;
  }
  res.blog.updateAt = new Date();

  try {
    const updatedBlog = await res.blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one blog post
router.delete("/:id", getBlog, async (req, res) => {
  try {
    await res.blog.deleteOne();
    res.json({ message: "Deleted blog post" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function for get by ID
async function getBlog(req: any, res: any, next: any) {
  let blog;
  try {
    blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: "Cannot find blog post" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.blog = blog;
  next();
}

export default router;
