import express from 'express';
import { FollowerControllers } from './follower.controller';

const router = express.Router();

router.post('/follow', FollowerControllers.followByUser);

router.get('/followers', FollowerControllers.getFollowers);

router.get('/followings', FollowerControllers.getFollowings);

export const FollowerRoutes = router;
