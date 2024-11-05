import express from 'express';
import { StatisticsControllers } from './statistics.controller';

const router = express.Router();

router.get('/statistics', StatisticsControllers.statistics);

export const StatisticsRoutes = router;
