import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/', UserControllers.getAllUsers);

router.patch('/update/:id', UserControllers.updateUser);

export const UserRoutes = router;
