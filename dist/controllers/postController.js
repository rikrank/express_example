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
exports.updatePost = exports.deletePost = exports.addPost = exports.getPosts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const postModel_1 = __importDefault(require("../models/postModel"));
/**
 * Fetch all posts
 * GET /posts
 */
exports.getPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield postModel_1.default.find({}, (error, post) => {
        if (error)
            res.send(error);
        res.json(post);
    });
}));
/**
 * Add new post
 * POST /posts
 */
exports.addPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = new postModel_1.default(req.body);
    try {
        const post = yield newPost.save();
        res.json(post);
    }
    catch (error) {
        res.send(error);
    }
}));
/**
 * Delete post
 * DELETE /posts/:postId
 */
exports.deletePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield postModel_1.default.deleteOne({
        _id: req.params.postId,
    }, (error) => {
        if (error)
            res.send(error);
        res.json({ message: "Post successfully deleted" });
    });
}));
/**
 * Update post
 * PATCH /posts/:postId
 */
exports.updatePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.default.findOneAndUpdate({
            _id: req.params.postId,
        }, req.body, { new: true });
        if (post) {
            res.json(post);
        }
        else {
            res.status(404).send({ message: "Post not found" });
        }
    }
    catch (error) {
        res.send(error);
    }
}));
//# sourceMappingURL=postController.js.map