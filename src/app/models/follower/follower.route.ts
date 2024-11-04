import express from 'express';
import { FollowerControllers } from './follower.controller';

const router = express.Router();

router.post('/follow', FollowerControllers.followByUser);

router.delete('/unFollow', FollowerControllers.unFollowByUser);

export const FollowerRoutes = router;
