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
const express_1 = __importDefault(require("express"));
const Blog_1 = __importDefault(require("../models/Blog"));
const router = express_1.default.Router();
// Create a blog post
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = new Blog_1.default({
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    try {
        const newBlog = yield blog.save();
        res.status(201).json(newBlog);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Get all blog posts
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog_1.default.find();
        res.json(blogs);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get one blog post
router.get("/:id", getBlog, (req, res) => {
    res.json(res.blog);
});
// Update one blog post
router.patch("/:id", getBlog, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.title != null) {
        res.blog.title = req.body.title;
    }
    if (req.body.content != null) {
        res.blog.content = req.body.content;
    }
    res.blog.updateAt = new Date();
    try {
        const updatedBlog = yield res.blog.save();
        res.json(updatedBlog);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Delete one blog post
router.delete("/:id", getBlog, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.blog.deleteOne();
        res.json({ message: "Deleted blog post" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Middleware function for get by ID
function getBlog(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let blog;
        try {
            blog = yield Blog_1.default.findById(req.params.id);
            if (blog == null) {
                return res.status(404).json({ message: "Cannot find blog post" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
        res.blog = blog;
        next();
    });
}
exports.default = router;
//# sourceMappingURL=blog.js.map