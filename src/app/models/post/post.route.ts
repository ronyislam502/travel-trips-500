import express from 'express';
import { PostControllers } from './post.controller,';

const router = express.Router();

router.post('/create-post', PostControllers.createPost);

router.get('/', PostControllers.getAllPosts);

router.delete('/delete/:id', PostControllers.deletePost);

router.patch('/update/:id', PostControllers.updatePost);

router.post('/upvote/:id', PostControllers.upVote);

router.post('/downvote/:id', PostControllers.downVote);

router.get('/popular-post', PostControllers.popularPosts);

export const PostRoutes = router;
