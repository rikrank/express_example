"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../../controllers/postController");
const router = express_1.default.Router();
// GET POST
router.route('/').get(postController_1.getPosts).post(postController_1.addPost);
// DELETE PATCH
router.route('/:postId').delete(postController_1.deletePost).patch(postController_1.updatePost);
exports.default = router;
//# sourceMappingURL=posts.js.map