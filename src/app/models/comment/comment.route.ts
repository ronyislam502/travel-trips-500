import express from 'express';
import { CommentControllers } from './comment.controller';

const router = express.Router();

router.post('/create-comment', CommentControllers.createCommentByPost);

router.get('/', CommentControllers.getAllCommentsByPost);

router.patch('/update/:id', CommentControllers.updateCommentByPost);

router.patch('/delete/:id', CommentControllers.deleteCommentByPost);

export const CommentRoutes = router;
