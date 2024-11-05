import { Router } from 'express';
import { UserRoutes } from '../models/user/user.route';
import { PostRoutes } from '../models/post/post.route';
import { CommentRoutes } from '../models/comment/comment.route';
import { FollowerRoutes } from '../models/follower/follower.route';
import { PaymentRoutes } from '../models/payment/payment.route';
import { AuthRoutes } from '../models/auth/auth.route';
import { BookingsRoutes } from '../models/booking/booking.route';
import { StatisticsRoutes } from '../models/statistics/statistics.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
  {
    path: '/followers',
    route: FollowerRoutes,
  },
  {
    path: '/bookings',
    route: BookingsRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
  {
    path: '/statistics',
    route: StatisticsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
