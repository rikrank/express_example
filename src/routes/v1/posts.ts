import express from 'express';
import { addPost, deletePost, getPosts, updatePost } from '../../controllers/postController';

const router = express.Router();

// GET POST
router.route('/').get(getPosts).post(addPost);

// DELETE PATCH
router.route('/:postId').delete(deletePost).patch(updatePost);

export default router;