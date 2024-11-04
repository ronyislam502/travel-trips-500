import express from 'express';
import { PostControllers } from './post.controller,';

const router = express.Router();

router.post('/create-post', PostControllers.createPost);

router.get('/', PostControllers.getAllPosts);

router.delete('/delete/:id', PostControllers.deletePost);

router.patch('/update/:id', PostControllers.updatePost);

export const PostRoutes = router;
